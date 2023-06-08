import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {Field, ObjectType} from "type-graphql";

@ObjectType()
@Entity()
export class Category {
	@Field()
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Field()
	@Column()
	name: string;

	@Field()
	@Column({nullable: true})
	description?: string;
}
