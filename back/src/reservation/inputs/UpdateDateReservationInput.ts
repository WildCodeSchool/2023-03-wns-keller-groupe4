import { Field, InputType } from "type-graphql";

@InputType()
export default class UpdateDateReservationInput {
    @Field()
    id: string;

    @Field()
    start_at: Date;

    @Field()
    end_at: Date;
}
