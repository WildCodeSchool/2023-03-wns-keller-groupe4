import { Field, InputType } from "type-graphql";
import { UserBilling } from "../../userBilling/entity/UserBilling";

@InputType()
export default class CreateInvoiceInput {
    @Field()
    reservation_id: string;

    @Field()
    user_id: string;

    user_billing: UserBilling;
}