import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from "typeorm";

import { Field, ObjectType, registerEnumType } from "type-graphql";
import { User } from "../../user/entity/User";
import { ReservationDetail } from "./ReservationDetail";
import { Invoice } from "../../invoice/entity/Invoice";

export enum EnumStatusReservation {
    IN_CART = "in_cart",
    PAYING = "paying",
    IN_PREPARATION = "in_preparation",
    READY = "ready",
    WITHDRAWED = "withdrawed",
    RETURNED = "returned",
}

registerEnumType(EnumStatusReservation, {
    name: "EnumStatusReservation",
    description: "Liste des status possible pour une réservation",
});

@ObjectType()
@Entity()
export class Reservation {
    @Field()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    start_at: Date;

    @Field({ nullable: true })
    @Column({ nullable: true })
    end_at: Date;

    @Field()
    @Column()
    status: EnumStatusReservation;

    @Field()
    @Column({
        default: () => "CURRENT_TIMESTAMP",
        nullable: true,
    })
    created_at: Date;

    @Field()
    @Column({
        default: () => "CURRENT_TIMESTAMP",
        nullable: true,
    })
    updated_at: Date;

    // relations :

    @Field(() => User)
    @ManyToOne((type) => User, (user) => user.reservations, {
        onDelete: "CASCADE",
        orphanedRowAction: "delete",
    })
    @JoinColumn()
    user: User;

    @Field(() => [ReservationDetail])
    @OneToMany(() => ReservationDetail, (detail) => detail.reservation, {
        cascade: true,
    })
    reservationsDetails: ReservationDetail[];

    @Field(() => Invoice)
    @OneToOne(() => Invoice, (invoice) => invoice.reservation)
    invoice: Invoice;
}
