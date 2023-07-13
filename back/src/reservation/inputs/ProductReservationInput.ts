import { Field, InputType } from "type-graphql";

@InputType()
export default class ProductReservationInput {
    @Field()
    id: string;
}
