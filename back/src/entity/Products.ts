import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {Field, ObjectType} from "type-graphql";

@ObjectType()
@Entity()
export class Product {
	@Field()
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column()
	name: string;

	@Field()
	@Column("decimal", {precision: 10, scale: 2})
	price: number;

	@Field()
	@Column()
	stock: number;

	@Field()
	@Column()
	available: boolean;

	@Field()
	@Column("text")
	description: string;

	@Field()
	@Column("text")
	picture: string;

	@Field()
	@Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
	created_at: Date;
}
