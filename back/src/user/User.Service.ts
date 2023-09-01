import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";

import dataSource from "../utils";
import { JWT_SECRET } from "../index";
import { User } from "./entity/User";
import CreateUserInput from "./inputs/CreateUserInput";
import { UserProfile } from "./entity/UserProfile";
import UpdateUserInput from "./inputs/UpdateUserInput";
import LangResolver from "../lang/Lang.Resolver";
import SignupUserInput from "./inputs/SignupUserInput";


export default class UserService {
    repository = dataSource.getRepository(User);
    relations = ["user_profile.lang", "reservations.reservationsDetails.product"]


    /**
     * Créer un User 
     * @param createUserInput 
     * @returns renvois le User crée
    */
    async createOneUser(createUserInput: CreateUserInput): Promise<User> {
        try {
            createUserInput.hashedPassword = await argon2.hash(createUserInput.password);
            return await this.repository.save({ ...createUserInput });
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
    async login(email: string, password: string): Promise<User> {
        try {
            const user = await this.repository.findOneByOrFail({ email });
            if (await argon2.verify(user.hashedPassword, password)) {
                const token = jwt.sign({ email }, JWT_SECRET);
                return { ...user, token }
            } else throw new Error("passwords not matching");
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    /**
     * Créer un User et se connect directement apres
     * @param signupUserInput 
     * @returns renvois le User crée et le token de login
    */
    async signup(signupUserInput: SignupUserInput): Promise<User> {
        try {
            if (signupUserInput.password !== signupUserInput.passwordConfirm)
                throw new Error("Password and confirm password not matching")

            const userCreated = await this.createOneUser(signupUserInput);
            return await this.login(userCreated.email, signupUserInput.password);
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
            return await this.repository.find({
                relations: this.relations,
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
            return await this.repository.findOneOrFail({
                relations: this.relations,
                where: { id },
            });
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    /**
     * Renvois un utilisateur via son email
     * @param email - email de l'user a modifier
     * @returns User
    */
    async getOneUserByEmail(email: string): Promise<User> {
        try {
            return await this.repository.findOneOrFail({
                relations: this.relations,
                where: { email },
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

            if (updateUserInput.lang_id !== undefined) {
                updateUserInput.lang = await (new LangResolver().getLangById(updateUserInput.lang_id));
            }
            // on supprimme détruit la propriété lang_id poiur ne pas 
            // qu'elle soit pris en compte par la class UserProfile, sinon une erreur apollo apparait 
            // @ts-expect-error
            delete updateUserInput.lang_id;

            const result = await dataSource.getRepository(UserProfile)
                .update({ id: userToUpdate.user_profile.id }, updateUserInput);

            return typeof result.affected === "number" && result.affected > 0;
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
            await this.repository.remove(userToDelete);
            return true;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
}
