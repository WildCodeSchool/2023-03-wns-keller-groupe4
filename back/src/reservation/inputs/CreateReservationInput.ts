import { Field, InputType } from "type-graphql";
import { EnumStatusReservation } from "../entity/Reservation";
import { User } from "../../user/entity/User";
import UserReservationInput from "./UserReservationInput";
import { ReservationDetail } from "../entity/ReservationDetail";

@InputType()
export default class CreateReservationInput {
    @Field()
    user_id: string;

    reservationsDetails: ReservationDetail[] = []

    status: EnumStatusReservation = EnumStatusReservation.IN_CART;
}
