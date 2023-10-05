import { Field, InputType } from "type-graphql";

@InputType()
export default class UserReservationInput {
    @Field()
    id: string;

    @Field()
    email: string;
}
