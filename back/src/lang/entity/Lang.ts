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

    // pour avoir une valeur par défaut a notre id
    constructor(id: string|null = null){
        if(id === null){

            // géré la langue pas dégaut avec un fichier de constant
            this.id = "92011618-e552-4f37-bc5d-cdf80b48f462";
            this.name = ""; // pour ne pas etre null
        }
    }
}
