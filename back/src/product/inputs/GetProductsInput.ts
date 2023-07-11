import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class GetProductsInput {
    @Field({ nullable: true })
    limit?: number;

    @Field({ nullable: true })
    offset?: number;

    @Field({ nullable: true })
    name?: string;

    @Field({ nullable: true, defaultValue: "name" })
    orderBy: "name" | "price" | "stock" | "available" | "description" | "picture" | "created_at" | "updated_at" | "updated_by";

    @Field({ nullable: true, defaultValue: "ASC" })
    orderDirection: "ASC" | "DESC";
}