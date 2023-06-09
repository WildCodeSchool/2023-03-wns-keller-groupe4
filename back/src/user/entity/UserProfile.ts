import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class UserProfile {
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
    @Column({ type: "timestamptz" })
    birthday: Date;

    @Field()
    @Column()
    street: string;

    @Field()
    @Column()
    postal_code: string;

    @Field()
    @Column()
    crountry: string;

    @Field()
    // @ManyToOne(type => IS_LATLONG,)
    @JoinColumn()
    lang: string;
}
