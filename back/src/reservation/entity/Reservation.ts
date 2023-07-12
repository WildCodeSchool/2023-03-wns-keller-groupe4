import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";


@ObjectType()
@Entity()
export class Reservation {
    @Field()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Field()
    @Column()
    test: string;

    @Field()
    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @Field()
    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    updated_at: Date;

}
