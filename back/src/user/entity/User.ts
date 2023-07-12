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

    @Field()
    @Column()
    hashedPassword: string;

    @Field()
    @Column()
    role: EnumRoles;

    @Field()
    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @Field()
    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    updated_at: Date;

    // relations : 

    @Field()
    @OneToOne(
        (type) => UserProfile,
        { cascade: true, onDelete: 'CASCADE'}
    )
    @JoinColumn()
    user_profile: UserProfile;

    @Field(() => [Reservation], {nullable: true})
    @OneToMany(
        (type) => Reservation,
        (reservation) => reservation.user,
        {nullable: true}
    )
    @JoinColumn()
    reservations: Reservation[];


    // field non présent en bdd mais récupérable depuis l'endpoint
    @Field({nullable: true, description: "readonly"})
    token?: string;
}
