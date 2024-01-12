import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { UserBilling } from "./entity/UserBilling";
import UserBillingService from "./UserBilling.Service";
import UpdateUserBillingInput from "./inputs/UpdateUserBillingInput";

@Resolver()
export default class UserBillingResolver {
    service;
    constructor() {
        this.service = new UserBillingService();
    }

    // pour activer l'autorisation par token
    // @Authorized()
    @Query(() => UserBilling)
    async getUserBillingById(@Arg("id") id: string): Promise<UserBilling> {
        return await this.service.getOneUserBillingById(id);
    }

    // pour activer l'autorisation par token
    // @Authorized()
    // Update
    @Mutation(() => UserBilling)
    async updateUserBillingById(
        @Arg("updateUserBillingInput") updateUserBillingInput: UpdateUserBillingInput,
    ): Promise<UserBilling> {
        return await this.service.updateOneUserBillingById(updateUserBillingInput);
    }
}
