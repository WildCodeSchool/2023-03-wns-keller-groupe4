import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ObjectType, registerEnumType } from "type-graphql";
import { User } from "../../user/entity/User";
import { Product } from "../../product/entity/Product";


export enum EnumStatusReservation {
    PAYING = "paying",
    PROCESSING = "  processing",
    READY = "  ready",
    TAKEN = "  taken",
    RETURNED = "  returned",
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

    @Field()
    @Column({type: "timestamptz"})
    start_at: Date;

    @Field()
    @Column({type: "timestamptz"})
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


    @Field(() => [Product])
    @ManyToOne(() => Product)
    @JoinTable()
    products: Product[]
}
