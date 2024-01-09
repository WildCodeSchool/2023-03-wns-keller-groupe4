import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Invoice } from "./entity/Invoice";

@ObjectType()
@Entity()
export class UserBilling {
    @Field()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    firstname: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    lastname: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    street: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    postal_code: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    country: string;

    @Field(() => Invoice, { nullable: true })
    @OneToOne((type) => Invoice, (invoice) => invoice.reservation)
    @JoinColumn()
    invoice: Invoice;
}
