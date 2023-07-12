import { Field, InputType } from "type-graphql";
import { EnumStatusReservation } from "../entity/Reservation";
import { Product } from "../../product/entity/Product";
import { CreateCategoryInput } from "../../category/inputs/CreateCategoryInput";

@InputType()
export default class CreateReservationInput {
    @Field()
    start_at: Date;

    @Field()
    end_at: Date;

    @Field(() => [CreateCategoryInput])
    products: Product[];

    status: EnumStatusReservation = EnumStatusReservation.PAYING;
}
