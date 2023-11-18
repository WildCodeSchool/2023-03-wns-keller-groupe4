import { InputType, Field } from "type-graphql";
import { IsString, IsOptional, IsEnum, IsObject } from "class-validator";
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
    userEmail?: string;

    @Field(() => EnumStatusReservation, {
        nullable: true,
    })
    @IsOptional()
    @IsEnum(EnumStatusReservation)
    status?: EnumStatusReservation;

    @Field({ nullable: true })
    limit?: number;

    @Field({ nullable: true })
    offset?: number;

    @Field({ nullable: true, defaultValue: "id" })
    orderBy:
        | "id"
        | "price"
        | "stock"
        | "available"
        | "description"
        | "picture"
        | "created_at"
        | "updated_at"
        | "updated_by";

    @Field({ nullable: true, defaultValue: "ASC" })
    orderDirection: "ASC" | "DESC";
}

@InputType()
class SearchReservationDateInput {
    @Field(() => Date, { nullable: true })
    startDate?: Date;

    @Field(() => Date, { nullable: true })
    endDate?: Date;
}
