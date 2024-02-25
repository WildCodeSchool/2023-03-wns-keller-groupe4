import { createMethodDecorator } from "type-graphql";
import { EnumRoles } from "./user/entity/User";
import { AuthenticationError } from "apollo-server-express";

interface Context {
    payload: Payload;
    isApiKeyValid: boolean;
}

interface Payload {
    email: string;
    userId: string;
    role: string;
    iat: number;
    exp: number;
}

export function AuthCheck(...roles: EnumRoles[]) {
    return createMethodDecorator<Context>(async ({ context }, next) => {
        const claims = context.payload;

        const isApiKeyValid = context.isApiKeyValid;
        const isValidRole = roles.includes(claims.role as EnumRoles);

        if (!isApiKeyValid && (!claims || (roles.length && !isValidRole))) {
            throw new AuthenticationError(
                "Not authorized! Insufficient permissions.",
            );
        }

        return next();
    });
}
