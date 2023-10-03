import { Field, InputType } from "type-graphql";
import { EnumRoles } from "../entity/User";
import { UserProfile } from "../entity/UserProfile";

@InputType()
export default class CreateUserInput {
    @Field()
    email: string;

    @Field((type) => EnumRoles)
    role: EnumRoles;

    @Field()
    password: string;

    user_profile: UserProfile = new UserProfile();

    hashedPassword: string;
}
