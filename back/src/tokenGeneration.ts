import { Response } from "express";
import { sign } from "jsonwebtoken";

export const JWT_SECRET = process.env.JWT_SECRET_KEY as string;
export const REFRESH_JWT_SECRET = process.env.REFRESH_JWT_SECRET_KEY as string;

if (JWT_SECRET === undefined || REFRESH_JWT_SECRET === undefined) {
    throw Error("JWT secret undefined");
}

/**
 * @param email
 * @returns renvois un accessToken
 */
export const createAccessToken = (email: string, role: string): string => {
    return sign({ email, role }, JWT_SECRET, {
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
    role: string,
    tokenVersion: number,
): string => {
    return sign({ email, role, tokenVersion }, REFRESH_JWT_SECRET, {
        expiresIn: "7d",
    });
};
/**
 *
 * @param res
 * @param accessToken
 * @returns renvois un refreshToken en cookie http only
 */
export const sendRefreshToken = (res: Response, accessToken: string): void => {
    res.cookie("jid", accessToken, { httpOnly: true });
};
