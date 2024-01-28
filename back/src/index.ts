import "reflect-metadata";
import * as dotenv from "dotenv";
import * as jwt from "jsonwebtoken";
import dataSource from "./utils";
import {
    createIDToken,
    createRefreshToken,
    sendRefreshToken,
} from "./tokenGeneration";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-express";
import CategoryResolver from "./category/Category.Resolver";
import ProductResolver from "./product/Product.Resolver";
import LangResolver from "./lang/Lang.Resolver";
import UserResolver from "./user/User.Resolver";
import InvoiceResolver from "./invoice/Invoice.Resolver";
import UserBillingResolver from "./userBilling/UserBilling.Resolver";
import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import { verify } from "jsonwebtoken";
import { User } from "./user/entity/User";
import cors from "cors";
import whitelistCORS from "./whitelistCORS";
import ReservationResolver from "./reservation/Reservation.Resolver";
import {
    dataFixture,
    resetAllMockData,
    resetMockCategories,
    resetMockProducts,
    resetMockUsers,
} from "./fixtures/fixtures";
import bodyParser from "body-parser";

dotenv.config();

export interface MyContext {
    req: Request;
    res: Response;
    payload?: { email: string };
}

dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET_KEY as string;

if (JWT_SECRET === undefined) {
    throw Error("JWT secret undefined");
}

const start = async (): Promise<void> => {
    await dataSource.initialize();

    const app = express();

    app.use(
        cors({
            origin: whitelistCORS,
            credentials: true,
        }),
    );

    app.use(bodyParser.json({ limit: "50 mb" }));
    app.use(cookieParser());

    app.get("/", (req: Request, res: Response) => res.send("hello"));

    app.get("/refresh_token", async (req: Request, res: Response) => {
        const token = req.cookies?.jid;

        if (token === undefined || token === "") {
            return res.send({ ok: false, IDToken: "" });
        }

        try {
            const payload = verify(
                token,
                process.env.REFRESH_JWT_SECRET_KEY as string,
            ) as any;

            const user = await dataSource
                .getRepository(User)
                .findOneBy({ email: payload.email });

            if (user === null || user.tokenVersion !== payload.tokenVersion) {
                return res.send({ ok: false, IDToken: "" });
            }

            sendRefreshToken(
                res,
                createRefreshToken(
                    payload.email,
                    user.id,
                    user.user_profile?.firstname || "",
                    user.user_profile?.lastname || "",
                    user.role,
                    user.tokenVersion,
                ),
            );

            return res.send({
                ok: true,
                IDToken: createIDToken(
                    payload.email,
                    user.id,
                    user.user_profile?.firstname || "",
                    user.user_profile?.lastname || "",
                    user.role,
                ),
            });
        } catch (err) {
            console.error(err);
            return res.send({ ok: false, IDToken: "" });
        }
    });

    const typeGraphQLgeneratedSchema = await buildSchema({
        validate: { forbidUnknownValues: false },
        resolvers: [
            UserResolver,
            CategoryResolver,
            ProductResolver,
            LangResolver,
            ReservationResolver,
            InvoiceResolver,
            UserBillingResolver,
        ],
        authChecker: ({ context }, roles) => {
            const { email, role } = context.payload;

            if (email !== undefined) {
                if (roles.length === 0 || roles.includes(role)) {
                    return true; // Authorized
                }
            }

            return false; // Not authorized
        },
    });

    const server = new ApolloServer({
        schema: typeGraphQLgeneratedSchema,
        context: ({ req, res }) => {
            const { authorization } = req.headers;
            if (
                authorization === undefined ||
                !authorization.startsWith("Bearer ")
            ) {
                return { req, res, payload: { email: undefined } };
            } else {
                const token = authorization.split(" ")[1];
                try {
                    const payload = jwt.verify(token, JWT_SECRET);
                    return { req, res, payload };
                } catch (err) {
                    console.error(err);
                    return { req, res, payload: { email: undefined } };
                }
            }
        },
    });

    await server.start();

    server.applyMiddleware({ app, cors: false });

    app.listen(4000, () => {
        console.log("express server OPEN");
    });

    if (
        resetMockCategories ||
        resetMockProducts ||
        resetMockUsers ||
        resetAllMockData
    ) {
        void dataFixture();
    } else {
        console.log("data fixture off");
    }
};

void start();
