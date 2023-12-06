import { Field, InputType } from "type-graphql";
import { EnumProductReservationStatus } from "../entity/ReservationDetail";

@InputType()
export default class DetailReservationInput {
    @Field()
    product_id: string;

    @Field()
    quantity: number;

    @Field()
    start_at: Date;

    @Field()
    status?: EnumProductReservationStatus =
        EnumProductReservationStatus.IN_PREPARATION;

    @Field()
    end_at: Date;
}
