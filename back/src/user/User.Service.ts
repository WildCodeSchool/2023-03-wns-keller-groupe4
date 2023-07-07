import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";

import dataSource from "../utils";
import { JWT_SECRET } from "../index";
import { User } from "./entity/User";
import CreateUserInput from "./inputs/CreateUserInput";
import { UserProfile } from "./entity/UserProfile";
import UpdateUserInput from "./inputs/UpdateUserInput";
import LangResolver from "../lang/Lang.Resolver";


export default class UserService {

    /**
     * Créer un User 
     * @param createUserInput 
     * @returns renvois le User crée
    */
    async createOneUser(createUserInput: CreateUserInput): Promise<User> {
        try {
            createUserInput.hashedPassword = await argon2.hash(createUserInput.password);
            return await dataSource
                .getRepository(User)
                .save({ ...createUserInput });
        } catch (err: any) {
            throw new Error(err.message);
        }
    }


    /**
     * Créer la signature JWT pour se connecter au site
     * @param email 
     * @param password 
     * @returns renvois le token si l'authentification réussi, sinon renvois une erreur
    */
    async login(email: string, password: string): Promise<String> {
        try {
            const user = await dataSource
                .getRepository(User)
                .findOneByOrFail({ email });

            if (await argon2.verify(user.hashedPassword, password)) {
                return jwt.sign({ email }, JWT_SECRET);
            } else throw new Error("passwords not matching");
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    /**
     * Renvois un tableau de tous les users
     * @returns User[] 
    */
    async getAllUsers(): Promise<User[]> {
        try {
            return await dataSource.getRepository(User).find({
                relations: ["user_profile", "user_profile.lang"],
            });
        } catch (err: any) {
            console.log()
            throw new Error(err.message);
        }
    }

    /**
     * Renvois un utilisateur via son id
     * @param id - uuid de l'user a modifier
     * @returns User
    */
    async getOneUserById(id: string): Promise<User> {
        try {
            return await dataSource.getRepository(User).findOneOrFail({
                relations: ["user_profile", "user_profile.lang"],
                where: { id },
            });
        } catch (err: any) {
            throw new Error(err.message);
        }
    }


    /**
     * Modifie un user
     * @param id - uuid de l'user a modifier
     * @param updateUserInput 
     * @returns - true si la modification a réussi, sinon renvois une erreur
    */
    async updateOneUser(id: string, updateUserInput: UpdateUserInput): Promise<Boolean> {
        try {
            const userToUpdate = await this.getOneUserById(id);

            if(updateUserInput.lang_id !== undefined){
                updateUserInput.lang = await (new LangResolver().getLangById(updateUserInput.lang_id));
            } 
            // on supprimme détruit la propriété lang_id poiur ne pas 
            // qu'elle soit pris en compte par la class UserProfile, sinon une erreur apollo apparait 
            // @ts-expect-error
            delete updateUserInput.lang_id;

            await dataSource
                .getRepository(UserProfile)
                .update({id: userToUpdate.user_profile.id}, updateUserInput);

            return true;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }


    /**
     * Supprime une entité user via son id
     * @param id uuid de la ligne bdd du user à supprimer
     * @returns Promise< bool> : si la suppression a bien réussi
    */
     async deleteOneUserById(id: string): Promise<Boolean> {
        try {
            const userToDelete = await this.getOneUserById(id);
            await dataSource.getRepository(User).remove(userToDelete);
            return true;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
}
