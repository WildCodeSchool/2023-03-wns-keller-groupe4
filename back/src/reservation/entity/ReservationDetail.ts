import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Field, ObjectType, registerEnumType } from "type-graphql";
import { Product } from "../../product/entity/Product";
import { Reservation } from "./Reservation";

export enum EnumProductReservationStatus {
    IN_PREPARATION = "in_preparation",
    READY = "ready",
    WITHDRAWED = "withdrawed",
    RETURNED = "returned",
}

registerEnumType(EnumProductReservationStatus, {
    name: "EnumProductReservationStatus",
    description:
        "Liste des status possible pour un produit dans une réservation",
});

@ObjectType()
@Entity()
export class ReservationDetail {
    @PrimaryGeneratedColumn("uuid")
    id?: string;

    @Field()
    @Column()
    quantity: number;

    @Field()
    @Column()
    start_at: Date;

    @Field()
    @Column()
    end_at: Date;

    @Field(() => Product)
    @ManyToOne(() => Product, (product) => product.productsDetails)
    product: Product;

    @Field()
    @Column()
    status: EnumProductReservationStatus;

    @ManyToOne(
        () => Reservation,
        (reservation) => reservation.reservationsDetails,
        {
            onDelete: "CASCADE",
            orphanedRowAction: "delete",
        },
    )
    reservation: Reservation;
}
