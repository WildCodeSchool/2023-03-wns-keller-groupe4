import { Field, InputType } from "type-graphql";
import { Lang } from "../../lang/entity/Lang";

@InputType()
export default class UpdateUserInput {
    @Field({ nullable: true })
    firstname: string;

    @Field({ nullable: true })
    lastname: string;

    @Field({ nullable: true })
    birthday: Date;

    @Field({ nullable: true })
    street: string;

    @Field({ nullable: true })
    postal_code: string;

    @Field({ nullable: true })
    country: string;

    @Field({ nullable: true })
    lang_id: string;

    lang: Lang;
   
}
