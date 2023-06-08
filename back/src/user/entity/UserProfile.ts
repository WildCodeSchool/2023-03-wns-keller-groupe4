import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";


@ObjectType()
@Entity()
export class UserProfile {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  user_id: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({type: 'timestamptz'})
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
  @Column()
  lang_id: string;
}
