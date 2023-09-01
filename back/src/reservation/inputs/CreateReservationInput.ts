import { Field, InputType } from "type-graphql";
import { EnumStatusReservation } from "../entity/Reservation";
import { User } from "../../user/entity/User";
import UserReservationInput from "./UserReservationInput";
import { ReservationDetail } from "../entity/ReservationDetail";

@InputType()
export default class CreateReservationInput {
    @Field()
    start_at: Date;

    @Field()
    end_at: Date;

    @Field(() => UserReservationInput)
    user: User;

    reservationsDetails: ReservationDetail[] = []

    status: EnumStatusReservation = EnumStatusReservation.PAYING;
}
