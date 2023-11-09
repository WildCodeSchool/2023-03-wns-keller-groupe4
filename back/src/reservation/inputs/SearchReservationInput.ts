import { InputType, Field } from "type-graphql";
import {
    IsString,
    IsEmail,
    IsOptional,
    IsEnum,
    IsObject,
} from "class-validator";
import { EnumStatusReservation } from "../entity/Reservation";

@InputType()
export class SearchReservationInput {
    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    id?: string;

    @Field(() => SearchReservationDateInput, { nullable: true })
    @IsOptional()
    @IsObject()
    date?: { startDate: Date; endDate: Date };

    @Field({ nullable: true })
    @IsOptional()
    @IsEmail()
    userEmail?: string;

    @Field(() => EnumStatusReservation, {
        nullable: true,
    })
    @IsOptional()
    @IsEnum(EnumStatusReservation)
    status?: EnumStatusReservation;
}

@InputType()
class SearchReservationDateInput {
    @Field(() => Date, { nullable: true })
    startDate: Date;

    @Field(() => Date, { nullable: true })
    endDate: Date;
}
