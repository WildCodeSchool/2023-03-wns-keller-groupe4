import { Field, InputType } from "type-graphql";
import { Product } from "../entity/Product";

@InputType()
export class SearchProductInput {
    @Field({ nullable: true })
    name?: string;

    @Field({ nullable: true })
    mostWanted: boolean;
}
