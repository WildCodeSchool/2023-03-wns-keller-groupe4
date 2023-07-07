import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "./entity/User";
import UserService from "./User.Service";
import CreateUserInput from "./inputs/CreateUserInput";
import UpdateUserInput from "./inputs/UpdateUserInput";

@Resolver()
export default class UserResolver {
    service;
    constructor() {
        this.service = new UserService();
    }

    @Mutation(() => User)
    async createUser(
        @Arg("createUserInput") createUserInput: CreateUserInput
    ): Promise<User> {
        return await this.service.createOneUser(createUserInput);
    }

    @Query(() => String)
    async login(
        @Arg("email") email: string,
        @Arg("password") password: string
    ): Promise<String> {
        return await this.service.login(email, password);
    }

    // pour activer l'autorisation par token
    // @Authorized()
    @Query(() => [User])
    async getUsers(): Promise<User[]> {
        return await this.service.getAllUsers();
    }

    // pour activer l'autorisation par token
    // @Authorized()
    @Query(() => User)
    async getUserById(@Arg("id") id: string): Promise<User> {
        return await this.service.getOneUserById(id);
    }

    @Mutation(() => Boolean)
    async updateUser(
        @Arg("id") id: string,
        @Arg("updateUserInput") updateUserInput: UpdateUserInput
    ): Promise<Boolean> {
        return await this.service.updateOneUser(id, updateUserInput);
    }

    @Mutation(() => Boolean)
    async deleteUserById(
        @Arg("id") id: string
    ): Promise<Boolean> {
        return await this.service.deleteOneUserById(id);
    }
}
