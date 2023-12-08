import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Lang } from "../../lang/entity/Lang";

@ObjectType()
@Entity()
export class UserProfile {
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
    birthday: Date;

    @Field({ nullable: true })
    @Column({ nullable: true })
    street: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    postal_code: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    country: string;

    @Field({ nullable: true })
    @ManyToOne((type) => Lang, (lang) => lang.user_profiles, { nullable: true })
    @JoinColumn()
    lang: Lang;
}
