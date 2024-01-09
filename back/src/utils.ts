import { DataSource } from "typeorm";
import { Category } from "./category/entity/Category";
import { dataFixtureWipe } from "./fixtures/fixtures";
import { Lang } from "./lang/entity/Lang";
import { Product } from "./product/entity/Product";
import { Reservation } from "./reservation/entity/Reservation";
import { ReservationDetail } from "./reservation/entity/ReservationDetail";
import { User } from "./user/entity/User";
import { UserProfile } from "./user/entity/UserProfile";
import { UserBilling } from "./userBilling/entity/UserBilling";
import { Invoice } from "./invoice/entity/Invoice";

console.log("dataFixtureWipe", dataFixtureWipe);

const dataSource = new DataSource({
    logging: ["error"],
    type: "postgres",
    host: "db",
    port: 5432,
    username: "postgres",
    password: process.env.POSTGRES_PASSWORD,
    database: "postgres",
    synchronize: true,
    entities: [
        User,
        UserProfile,
        UserBilling,
        Lang,
        Product,
        Category,
        Reservation,
        ReservationDetail,
        Invoice,
    ],
    dropSchema: dataFixtureWipe,
});

export default dataSource;
