import {
	Column,
	Entity,
	JoinTable,
	ManyToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import {Field, ObjectType} from "type-graphql";
import {Category} from "../../category/entity/Category";

@ObjectType()
@Entity()
export class Product {
	@Field()
	@PrimaryGeneratedColumn("uuid")
	id: string;

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
	@Column({type: "timestamptz", default: () => "CURRENT_TIMESTAMP"})
	created_at: Date;

	@Field()
	@Column({type: "timestamptz", nullable: true})
	updated_at: Date;

	@Field()
	@Column({nullable: true})
	updated_by: string;

	@ManyToMany(() => Category, (categorie) => categorie.products)
	@JoinTable()
	categories: Category[];
}
