import "reflect-metadata";
import * as dotenv from "dotenv";
import * as jwt from "jsonwebtoken";
import dataSource from "./utils";
import {
    createAccessToken,
    createIDToken,
    createRefreshToken,
    sendRefreshToken,
} from "./tokenGeneration";
import { buildSchema } from "type-graphql";
import { ApolloServer, AuthenticationError } from "apollo-server-express";
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
import { log } from "console";

dotenv.config();

export interface MyContext {
    req: Request;
    res: Response;
    payload?: { email: string; role: string; iss: string; aud: string };
}

dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET_KEY as string;
export const API_KEY = process.env.API_KEY as string;
export const EXPECTED_ISSUER = process.env.EXPECTED_ISSUER;
export const EXPECTED_AUDIENCE = process.env.EXPECTED_AUDIENCE;

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

    app.post("/refresh_token", async (req: Request, res: Response) => {
        const token = req.cookies?.jid;

        if (token === undefined || token === "") {
            return res.send({ ok: false, tokens: {} });
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
                return res.send({ ok: false, tokens: {} });
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

            const tokens = {
                IDToken: createIDToken(
                    user.email,
                    user.id,
                    user.user_profile?.firstname,
                    user.user_profile?.lastname,
                    user.role,
                ),
                accessToken: createAccessToken(user.id, user.role),
            };

            return res.send({
                tokens,
            });
        } catch (err) {
            console.error(err);

            return res.send({ ok: false, tokens: {} });
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
    });

    const server = new ApolloServer({
        schema: typeGraphQLgeneratedSchema,
        context: ({ req, res }) => {
            const headers = req.headers;

            if (
                headers.authorization &&
                headers.authorization.startsWith("Bearer ")
            ) {
                const token = headers.authorization.split(" ")[1];
                console.log(token);

                try {
                    const payload = jwt.verify(
                        token,
                        JWT_SECRET,
                    ) as jwt.JwtPayload;

                    if (
                        payload.iss !== EXPECTED_ISSUER ||
                        payload.aud !== EXPECTED_AUDIENCE
                    ) {
                        throw new Error("jwt expired or not valid");
                    }

                    return { req, res, payload };
                } catch (err: any) {
                    if (err.message.includes("jwt expired"))
                        throw new AuthenticationError(
                            "jwt expired or not valid",
                        );
                }
            }

            if (headers["x-api-key"]) {
                const isApiKeyValid = headers["x-api-key"] === API_KEY;

                return { req, res, isApiKeyValid };
            }

            return { req, res };
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
