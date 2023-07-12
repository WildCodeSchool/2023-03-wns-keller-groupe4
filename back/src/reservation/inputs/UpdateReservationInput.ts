import { Field, InputType } from "type-graphql";

@InputType()
export default class UpdateReservationInput {
    @Field()
    start_at: Date;
}
