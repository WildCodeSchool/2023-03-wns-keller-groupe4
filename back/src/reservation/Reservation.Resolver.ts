import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { EnumStatusReservation, Reservation } from "./entity/Reservation";
import ReservationService from "./Reservation.Service";
import CreateReservationInput from "./inputs/CreateReservationInput";
import DetailReservationInput from "./inputs/DetailReservationInput";
import GetProductReservationQuantityByDatesInput from "./inputs/GetProductReservationQuantityByDatesInput";

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
    @Query(() => [Reservation])
    async getReservationsByUserId(@Arg("id") id: string): Promise<Reservation[]> {
        return await this.service.getAllReservationsByUserId(id);
    }

    // pour activer l'autorisation par token
    // @Authorized()
    @Query(() => Reservation)
    async getCartReservationOfUser(@Arg("id") id: string): Promise<Reservation> {
        return await this.service.getCartReservationOfUserByUserId(id);
    }

    // pour activer l'autorisation par token
    // @Authorized()
    @Query(() => Reservation)
    async getReservationById(@Arg("id") id: string): Promise<Reservation> {
        return await this.service.getOneReservationById(id);
    }

    // pour activer l'autorisation par token
    // @Authorized()
    @Query(() => Number)
    async getProductReservationQuantityByDates(
        @Arg("getProductReservationQuantityByDatesInput", { nullable: true })
        getProductReservationQuantityByDatesInput: GetProductReservationQuantityByDatesInput,
    ): Promise<number> {
        return await this.service.getOneProductReservationQuantityByDates(getProductReservationQuantityByDatesInput);
    }

    @Mutation(() => Boolean)
    async deleteReservationById(
        @Arg("id") id: string
    ): Promise<Boolean> {
        return await this.service.deleteOneReservationById(id);
    }

    @Mutation(() => Reservation)
    async updateDateOfReservation(
        @Arg("id") id: string,
        @Arg("startAt") startAt: Date,
        @Arg("endAt") endAt: Date,
    ): Promise<Reservation> {
        return await this.service.updateDateOfOneReservation(id, startAt, endAt);
    }

    @Mutation(() => Reservation)
    async updateStatusOfReservation(
        @Arg("id") id: string,
        @Arg("status", (type) => EnumStatusReservation) status: EnumStatusReservation,
    ): Promise<Reservation> {
        return await this.service.updateStatusOfOneReservation(id, status);
    }

    @Mutation(() => Reservation)
    async updateDetailFromReservation(
        @Arg("id") id: string,
        @Arg("detail", (type) => DetailReservationInput) detail: DetailReservationInput
    ): Promise<Reservation> {
        return await this.service.updateDetailFromOneReservation(id, detail);
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
