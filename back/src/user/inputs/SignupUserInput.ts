import { Field, InputType } from "type-graphql";
import { EnumRoles } from "../entity/User";
import { UserProfile } from "../entity/UserProfile";

@InputType()
export default class SignupUserInput {
    @Field()
    email: string;

    @Field()
    password: string;
    
    @Field()
    passwordConfirm: string;
    

    role: EnumRoles = EnumRoles.USER;
    user_profile: UserProfile = new UserProfile();
    hashedPassword: string;
}
