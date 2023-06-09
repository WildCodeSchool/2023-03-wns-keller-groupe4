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

	// @Field({nullable: true})
	// @Column({nullable: true})
	// description?: string;

	@ManyToMany(() => Product, (product) => product.categories)
	products: Product[];
}
