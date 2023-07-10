import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class GetProductsInput {
    @Field({ nullable: true })
    limit?: number;

    @Field({ nullable: true })
    offset?: number;

    @Field({ nullable: true })
    name?: string;
}