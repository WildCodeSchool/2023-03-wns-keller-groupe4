import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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
    @Column({ nullable: true, type: "timestamptz" })
    birthday: Date;

    @Field({ nullable: true })
    @Column({ nullable: true })
    street: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    postal_code: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    crountry: string;

    @Field({ nullable: true })
    @ManyToOne((type) => Lang, (lang) => lang.user_profiles)
    lang: Lang = defaultLang;
}

// demander a karim pour les rendre null de base

// pour donner une valeur pas dégaut à lang
const defaultLang = new Lang();
defaultLang.id = "92011618-e552-4f37-bc5d-cdf80b48f462";
defaultLang.name = "(inutile) langue par défaut choisie";
