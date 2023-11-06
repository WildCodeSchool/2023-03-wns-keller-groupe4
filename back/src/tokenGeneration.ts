import { Response } from "express";
import { sign } from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET_KEY as string;
export const REFRESH_JWT_SECRET = process.env.REFRESH_JWT_SECRET_KEY as string;

if (JWT_SECRET === undefined || REFRESH_JWT_SECRET === undefined) {
    throw Error("JWT secret undefined");
}

/**
 * @param email
 * @returns renvois un IDToken
 */
export const createIDToken = (
    email: string,
    userId: string,
    firstname: string,
    lastname: string,
    role: string,
): string => {
    return sign({ email, userId, firstname, lastname, role }, JWT_SECRET, {
        expiresIn: "15m",
    });
};

/**
 * @param email
 * @param role
 * @param tokenVersion
 * @returns renvois un refreshToken
 */
export const createRefreshToken = (
    email: string,
    userId: string,
    firstname: string,
    lastname: string,
    role: string,
    tokenVersion: number,
): string => {
    return sign(
        { email, userId, firstname, lastname, role, tokenVersion },
        REFRESH_JWT_SECRET,
        {
            expiresIn: "7d",
        },
    );
};
/**
 *
 * @param res
 * @param refreshToken
 * @returns renvois un refreshToken en cookie http only
 */
export const sendRefreshToken = (res: Response, refreshToken: string): void => {
    res.cookie("jid", refreshToken, {
        httpOnly: true,
        path: "/",
    });
};
