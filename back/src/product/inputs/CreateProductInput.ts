import { Field, InputType } from "type-graphql";
import { Product } from "../entity/Product";
import { Min } from "class-validator";

@InputType()
export class CreateProductInput implements Partial<Product> {
    @Field()
    name: string;

    @Field()
    @Min(0)
    price: number;

    @Field()
    @Min(0)
    stock: number;

    @Field()
    available: boolean;

    @Field()
    description: string;

    @Field()
    picture: string;

    // Since a product can have many categories we expect an array of category ID here.
    @Field((type) => [String])
    category?: string[];
}
