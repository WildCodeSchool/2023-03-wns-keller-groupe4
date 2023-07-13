import { Field, InputType } from "type-graphql";
import { EnumStatusReservation } from "../entity/Reservation";
// import { Product } from "../../product/entity/Product";
import { User } from "../../user/entity/User";
import UserReservationInput from "./UserReservationInput";
import { Product } from "../../product/entity/Product";
import ProductReservationInput from "./ProductReservationInput";

@InputType()
export default class CreateReservationInput {
    @Field()
    start_at: Date;

    @Field()
    end_at: Date;

    @Field(() => [ProductReservationInput])
    products: Product[];

    @Field(() => UserReservationInput)
    user: User;

    status: EnumStatusReservation = EnumStatusReservation.PAYING;
}
