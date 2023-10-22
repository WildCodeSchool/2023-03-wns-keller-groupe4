import { Field, InputType } from "type-graphql";

@InputType()
export default class DetailReservationInput {

    @Field()
    product_id: string;

    @Field()
    quantity: number;

    @Field()
    start_at: Date;

    @Field()
    end_at: Date;
}
