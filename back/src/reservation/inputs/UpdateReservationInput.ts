import { Field, InputType } from "type-graphql";

@InputType()
export default class UpdateReservationInput {
    @Field()
    test: string;
}
