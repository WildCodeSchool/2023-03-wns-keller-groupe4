import { Field, InputType } from "type-graphql";
import { EnumRoles } from "../entity/User";

@InputType()
export default class CreateUserInput {
    @Field()
    email: string;

    @Field((type) => EnumRoles)
    role: EnumRoles;

    @Field()
    hashedPassword: string;
}
