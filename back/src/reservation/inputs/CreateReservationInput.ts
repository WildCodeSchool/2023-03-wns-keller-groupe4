import { Field, InputType } from "type-graphql";

@InputType()
export default class CreateReservationInput {
    @Field()
    test: string;
}
