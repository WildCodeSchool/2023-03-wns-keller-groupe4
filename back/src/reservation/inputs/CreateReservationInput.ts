import { Field, InputType } from "type-graphql";
import { EnumStatusReservation } from "../entity/Reservation";
import { Product } from "../../product/entity/Product";
import { GetProductsInput } from "../../product/inputs/GetProductsInput";

@InputType()
export default class CreateReservationInput {
    @Field()
    start_at: Date;

    @Field()
    end_at: Date;

    @Field(() => [GetProductsInput])
    products: Product[];

    status: EnumStatusReservation = EnumStatusReservation.PAYING;
}
