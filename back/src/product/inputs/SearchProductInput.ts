import { Field, InputType } from "type-graphql";

@InputType()
export class SearchProductInput {
    @Field({ nullable: true })
    name?: string;

    @Field({ nullable: true })
    mostWanted: boolean;
}
