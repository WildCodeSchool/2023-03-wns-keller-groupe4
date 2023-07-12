import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Field, InputType, ObjectType} from "type-graphql";
import {Product} from "../../product/entity/Product";

@ObjectType()
@InputType()
@Entity()
export class Category {
	@Field()
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Field()
	@Column()
	name: string;

	@Field(() => [Product])
	@ManyToMany(() => Product, (product) => product.categories, {eager: true})
	products: Product[];
}
