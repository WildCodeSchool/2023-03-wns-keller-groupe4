import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";

import dataSource from "../utils";
import { JWT_SECRET } from "../index";
import { User } from "./entity/User";
import CreateUserInput from "./inputs/CreateUserInput";
import { UserProfile } from "./entity/UserProfile";

export default class UserService {
    async createOneUser(createUserInput: CreateUserInput): Promise<User> {
        try {
            const newUserProfile = new UserProfile();
            newUserProfile.firstname = "firsname testus";
            newUserProfile.lastname = "lastname testus";
            newUserProfile.birthday = new Date();
            newUserProfile.crountry = "France testus";
            newUserProfile.postal_code = "77140";
            newUserProfile.street = "streety testus";
            newUserProfile.lang = "eeeeeee testus";

            await dataSource.getRepository(UserProfile).save(newUserProfile);

            createUserInput.hashedPassword = await argon2.hash(
                createUserInput.hashedPassword
            );

            return await dataSource
                .getRepository(User)
                .save({ ...createUserInput, user_profile: newUserProfile });
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

    async getOneUserById(id: string): Promise<User> {
        return await dataSource.getRepository(User).findOneOrFail({
            relations: { user_profile: true },
            where: { id },
        });
    }
}
