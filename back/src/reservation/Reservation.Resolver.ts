import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Reservation } from "./entity/Reservation";
import ReservationService from "./Reservation.Service";
import CreateReservationInput from "./inputs/CreateReservationInput";
import ProductReservationInput from "./inputs/ProductReservationInput";

@Resolver()
export default class ReservationResolver {
    service;
    constructor() {
        this.service = new ReservationService();
    }


    @Mutation(() => Reservation)
    async createReservation(
        @Arg("createReservationInput") createReservationInput: CreateReservationInput
    ): Promise<Reservation> {
        return await this.service.createOneReservation(createReservationInput);
    }

    // pour activer l'autorisation par token
    // @Authorized()
    @Query(() => [Reservation])
    async getReservations(): Promise<Reservation[]> {
        return await this.service.getAllReservations();
    }

    // pour activer l'autorisation par token
    // @Authorized()
    @Query(() => Reservation)
    async getReservationById(@Arg("id") id: string): Promise<Reservation> {
        return await this.service.getOneReservationById(id);
    }

    @Mutation(() => Boolean)
    async deleteReservationById(
        @Arg("id") id: string
    ): Promise<Boolean> {
        return await this.service.deleteOneReservationById(id);
    }

    @Mutation(() => Reservation)
    async updateDateFromReservation(
        @Arg("id") id: string,
        @Arg("startAt") startAt: Date,
        @Arg("endAt") endAt: Date,
    ): Promise<Reservation> {
        return await this.service.updateDateFromOneReservationById(id, startAt, endAt);
    }

    @Mutation(() => Reservation)
    async updateProductsQuantitiesFromReservation(
        @Arg("id") id: string,
        @Arg("products", (type) => [ProductReservationInput]) products: ProductReservationInput[]
    ): Promise<Reservation> {
        return await this.service.updateProductsQuantitiesFromOneReservation(id, products);
    }

    @Mutation(() => Reservation)
    async removeProductsFromReservation(
        @Arg("id") id: string,
        @Arg("products_ids", (type) => [String]) productsIds: string[]
    ): Promise<Reservation> {
        return await this.service.removeManyProductsFromOneReservation(id, productsIds);
    }

    @Mutation(() => Reservation)
    async removeAllProductsFromReservation(
        @Arg("id") id: string
    ): Promise<Reservation> {
        return await this.service.removeAllProductsFromOneReservation(id);
    }
}
