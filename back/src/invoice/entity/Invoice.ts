import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Reservation } from "../../reservation/entity/Reservation";
import { User } from "../../user/entity/User";
import { UserBilling } from "../../userBilling/entity/UserBilling";

@ObjectType()
@Entity()
export class Invoice {
    @Field()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Field(() => Reservation)
    @OneToOne(() => Reservation, (reservation) => reservation.invoice)
    @JoinColumn()
    reservation: Reservation;

    @Field(() => User)
    @ManyToOne(() => User, (user) => user.invoices)
    user: User;

    @Field(() => UserBilling)
    @OneToOne(() => UserBilling, {
        cascade: true,
        onDelete: "CASCADE",
    })
    @JoinColumn()
    UserBilling: UserBilling;

    @Field()
    @Column({
        default: () => "CURRENT_TIMESTAMP",
        nullable: true,
    })
    created_at: Date;
}