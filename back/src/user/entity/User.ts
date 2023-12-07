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
import { Invoice } from "../../invoice/entity/Invoice";

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
    })
    @JoinColumn()
    reservations: Reservation[];

    @Field(() => [Invoice], { nullable: true })
    @OneToMany((type) => Invoice, (invoice) => invoice.user, {
        nullable: true,
    })
    @JoinColumn()
    invoices: Invoice[];

    @Field()
    @Column({ default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @Field()
    @Column({ default: () => "CURRENT_TIMESTAMP" })
    updated_at: Date;

    @Column({ default: 0 })
    tokenVersion: number;
}
