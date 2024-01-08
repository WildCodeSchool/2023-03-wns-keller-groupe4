import { Field, InputType } from "type-graphql";
import { Product } from "../entity/Product";

@InputType()
export class SearchProductInput {
    @Field()
    name?: string;
}
