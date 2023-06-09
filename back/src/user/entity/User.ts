import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ObjectType, registerEnumType } from "type-graphql";
import { UserProfile } from "./UserProfile";

export enum EnumRoles {
    SUPERADMIN = "superAdmin",
    ADMIN = "admin",
    USER = "user",
}

registerEnumType(EnumRoles, {
    name: "EnumRoles",
    description: "Liste des roles possible pour un utilisateurrrr",
});

@ObjectType()
@Entity()
export class User {
    @Field()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Field()
    @Column({ unique: true })
    email: string;

    @Field()
    @Column()
    hashedPassword: string;

    @Field()
    @Column()
    role: EnumRoles;

    @Field()
    @OneToOne((type) => UserProfile)
    @JoinColumn()
    user_profile: UserProfile;

    @Field()
    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @Field()
    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    updated_at: Date;
}
