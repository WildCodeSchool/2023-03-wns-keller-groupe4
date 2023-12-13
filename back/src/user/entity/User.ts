import {
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ObjectType, registerEnumType } from "type-graphql";
import { UserProfile } from "./UserProfile";
import { Reservation } from "../../reservation/entity/Reservation";

export enum EnumRoles {
    SUPERADMIN = "superAdmin",
    ADMIN = "admin",
    USER = "user",
}

registerEnumType(EnumRoles, {
    name: "EnumRoles",
    description: "Liste des roles possible pour un utilisateur",
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

    @Column()
    hashedPassword: string;

    @Field()
    @Column({ default: EnumRoles.USER })
    role: EnumRoles;

    @Field()
    @OneToOne((type) => UserProfile, {
        cascade: true,
        onDelete: "CASCADE",
    })
    @JoinColumn()
    user_profile: UserProfile;

    @Field(() => [Reservation], { nullable: true })
    @OneToMany((type) => Reservation, (reservation) => reservation.user, {
        nullable: true,
        cascade: true,
    })
    @JoinColumn()
    reservations: Reservation[];

    @Field()
    // commented out because of non supported type "timestamptz" by test sqlite db
    // @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    @Column({ default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @Field()
    // commented out because of non supported type "timestamptz" by test sqlite db
    // @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    @Column({ default: () => "CURRENT_TIMESTAMP" })
    updated_at: Date;

    @Column({ default: 0 })
    tokenVersion: number;
}
