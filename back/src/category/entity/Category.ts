import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Field, ObjectType} from "type-graphql";
import {Product} from "../../product/entity/Product";

@ObjectType()
@Entity()
export class Category {
	@Field()
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Field()
	@Column()
	name: string;

	@ManyToMany(() => Product, (product) => product.categories)
	products: Product[];
}
