import { Field, InputType } from "type-graphql";

@InputType()
export default class GetProductReservationQuantityByDatesInput {
    @Field()
    product_id: string;

    @Field({ nullable: true })
    start_at: Date;

    @Field({ nullable: true })
    end_at: Date;
}
