import {
    Check,
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Category } from "../../category/entity/Category";
import { ReservationDetail } from "../../reservation/entity/ReservationDetail";

@ObjectType()
@Entity()
@Check(`"stock" >= 0 `)
@Check(`"price" >= 0 `)
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
    // changed type"timestampz" to datetime because "timestamptz" is not supported  by test sqlite db
    @Column({
        type: "datetime",
        default: () => "CURRENT_TIMESTAMP",
        nullable: true,
    })
    created_at: Date;

    @Field()
    // changed type"timestampz" to datetime because "timestamptz" is not supported  by test sqlite db
    @Column({ type: "datetime", nullable: true })
    updated_at?: Date;

    @Field()
    @Column({ nullable: true })
    updated_by?: string;

    @Field(() => [Category])
    @ManyToMany(() => Category, (category) => category.products, {
        cascade: true,
    })
    @JoinTable()
    categories: Category[];

    @OneToMany(() => ReservationDetail, (detail) => detail.product, {
        cascade: true,
    })
    productsDetails: ReservationDetail[];
}
