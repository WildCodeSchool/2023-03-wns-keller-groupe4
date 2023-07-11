import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { UserProfile } from "../../user/entity/UserProfile";
import { DEFAULT_LANG_ID } from "../../constants";

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
            this.id = DEFAULT_LANG_ID;
            this.name = ""; // pour ne pas etre null
        }
    }
}
