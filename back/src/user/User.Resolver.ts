import {
    Arg,
    Ctx,
    Field,
    Mutation,
    ObjectType,
    Query,
    Resolver,
} from "type-graphql";
import { User } from "./entity/User";
import UserService from "./User.Service";
import CreateUserInput from "./inputs/CreateUserInput";
import UpdateUserInput from "./inputs/UpdateUserInput";
import SignupUserInput from "./inputs/SignupUserInput";
import { MyContext } from "..";

@ObjectType()
export class Tokens {
    @Field()
    IDToken: string;
    @Field()
    accessToken: string;
}

@ObjectType()
export class LoginResponse {
    @Field()
    tokens: Tokens;
}

@Resolver()
export default class UserResolver {
    service;
    constructor() {
        this.service = new UserService();
    }

    @Query(() => LoginResponse)
    async login(
        @Arg("email") email: string,
        @Arg("password") password: string,
        @Ctx() ctx: MyContext,
    ): Promise<LoginResponse> {
        return await this.service.login(email, password, ctx);
    }

    @Mutation(() => Boolean)
    async signup(
        @Arg("signupUserInput") signupUserInput: SignupUserInput,
    ): Promise<Boolean> {
        return await this.service.signup(signupUserInput);
    }

    @Mutation(() => Boolean)
    async logout(@Ctx() ctx: MyContext): Promise<Boolean> {
        return await this.service.logout(ctx);
    }

    @Mutation(() => User)
    async createUser(
        @Arg("createUserInput") createUserInput: CreateUserInput,
    ): Promise<User> {
        return await this.service.createOneUser(createUserInput);
    }

    @Query(() => [User])
    async getUsers(): Promise<User[]> {
        return await this.service.getAllUsers();
    }

    @Query(() => User)
    async getUserById(@Arg("id") id: string): Promise<User> {
        return await this.service.getOneUserById(id);
    }

    @Query(() => User)
    async getUserByEmail(@Arg("email") email: string): Promise<User> {
        return await this.service.getOneUserByEmail(email);
    }

    @Mutation(() => Boolean)
    async updateUser(
        @Arg("id") id: string,
        @Arg("updateUserInput") updateUserInput: UpdateUserInput,
    ): Promise<Boolean> {
        return await this.service.updateOneUser(id, updateUserInput);
    }

    @Mutation(() => Boolean)
    async deleteUserById(@Arg("id") id: string): Promise<Boolean> {
        return await this.service.deleteOneUserById(id);
    }
}
