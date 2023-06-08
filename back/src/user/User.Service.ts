import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";

import dataSource from "../utils";
import { JWT_SECRET } from "../index";
import { User } from "./entity/User";
import CreateUserInput from "./inputs/CreateUserInput";

export default class UserService {
    async createOneUser(createUserInput: CreateUserInput): Promise<User> {
        try {
            createUserInput.hashedPassword = await argon2.hash(
                createUserInput.hashedPassword
            );
            return await dataSource.getRepository(User).save(createUserInput);
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    async login(email: string, password: string): Promise<String> {
        try {
            const user = await dataSource
                .getRepository(User)
                .findOneByOrFail({ email });

            if (await argon2.verify(user.hashedPassword, password)) {
                const token = jwt.sign({ email }, JWT_SECRET);
                return token;
            } else {
                return "error";
            }
        } catch (err) {
            console.log(err);
            return "error";
        }
    }

    async getAllUsers(): Promise<User[]> {
        return await dataSource.getRepository(User).find();
    }
}
