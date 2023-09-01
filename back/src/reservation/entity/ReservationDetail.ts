import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Product } from "../../product/entity/Product";
import { Reservation } from "./Reservation";

@ObjectType()
@Entity()
export class ReservationDetail {
    @PrimaryGeneratedColumn("uuid")
    id?: string

    @Field()
    @Column()
    quantity: number;

    @Field(() => Product)
    @ManyToOne(() => Product, (product) => product.productsDetails)
    product: Product

    @ManyToOne(() => Reservation, (reservation) => reservation.reservationsDetails)
    reservation: Reservation

}
