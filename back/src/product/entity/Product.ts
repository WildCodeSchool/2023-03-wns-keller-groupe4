import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Category } from "../../category/entity/Category";

@ObjectType()
@Entity()
export class Product {
    @Field()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Field()
    @Column({ unique: true })
    name: string;

    @Field()
    @Column("decimal", { precision: 10, scale: 2 })
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

    @Field({ nullable: true })
    // commented out because of non supported type "timestamptz" by test sqlite db
    // @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    @Column({ nullable: true })
    created_at: Date;

    @Field()
    // commented out because of non supported type "timestamptz" by test sqlite db
    // @Column({ type: "timestamptz", nullable: true })
    @Column({ nullable: true })
    updated_at?: Date;

    @Field()
    @Column({ nullable: true })
    updated_by?: string;

    @Field(() => [Category])
    @ManyToMany(() => Category, (category) => category.products)
    @JoinTable()
    categories: Category[];
}
