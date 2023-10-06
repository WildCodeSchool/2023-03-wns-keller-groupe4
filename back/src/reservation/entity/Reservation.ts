import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ObjectType, registerEnumType } from "type-graphql";
import { User } from "../../user/entity/User";
import { ReservationDetail } from "./ReservationDetail";


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
    description: "Liste des status possible pour une réservation"
});


@ObjectType()
@Entity()
export class Reservation {
    @Field()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Field({ nullable: true })
    @Column({ type: "timestamptz", nullable: true })
    start_at: Date;

    @Field({ nullable: true })
    @Column({ type: "timestamptz", nullable: true })
    end_at: Date;

    @Field()
    @Column()
    status: EnumStatusReservation;

    @Field()
    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @Field()
    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    updated_at: Date;


    // relations :

    @Field(() => User)
    @ManyToOne((type) => User, user => user.reservations)
    @JoinColumn()
    user: User;


    @Field(() => [ReservationDetail])
    @OneToMany(() => ReservationDetail, detail => detail.reservation, { cascade: true })
    reservationsDetails: ReservationDetail[];
}
