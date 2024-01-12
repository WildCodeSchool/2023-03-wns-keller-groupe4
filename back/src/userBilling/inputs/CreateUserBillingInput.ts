import { Field, InputType } from "type-graphql";

@InputType()
export default class CreateUserBillingInput {
    @Field()
    firstname: string;

    @Field()
    lastname: string;

    @Field()
    street: string;

    @Field()
    postal_code: string;

    @Field()
    country: string;
}