import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { UserProfile } from "../../user/entity/UserProfile";

@ObjectType()
@Entity()
export class Lang {
    @Field()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Field()
    @Column()
    name: string;

    @OneToMany((type) => UserProfile, (userProfile) => userProfile.lang)
    user_profiles: UserProfile[];
}
