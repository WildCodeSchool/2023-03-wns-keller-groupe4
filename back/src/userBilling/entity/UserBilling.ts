import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Invoice } from "../../invoice/entity/Invoice";

@ObjectType()
@Entity()
export class UserBilling {
    @Field()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Field()
    @Column()
    firstname: string;

    @Field()
    @Column()
    lastname: string;

    @Field()
    @Column()
    street: string;

    @Field()
    @Column()
    postal_code: string;

    @Field()
    @Column()
    country: string;
}
