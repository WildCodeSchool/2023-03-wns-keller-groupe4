import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { EnumStatusReservation, Reservation } from "./entity/Reservation";
import ReservationService from "./Reservation.Service";
import CreateReservationInput from "./inputs/CreateReservationInput";
import DetailReservationInput from "./inputs/DetailReservationInput";
import GetProductReservationQuantityByDatesInput from "./inputs/GetProductReservationQuantityByDatesInput";
import { SearchReservationInput } from "./inputs/SearchReservationInput";
import { AuthCheck } from "../authCustomerDecorator";
import { EnumRoles } from "../user/entity/User";

@Resolver()
export default class ReservationResolver {
    service;
    constructor() {
        this.service = new ReservationService();
    }
    @AuthCheck(EnumRoles.USER)
    @Mutation(() => Reservation)
    async createReservation(
        @Arg("createReservationInput")
        createReservationInput: CreateReservationInput,
    ): Promise<Reservation> {
        return await this.service.createOneReservation(createReservationInput);
    }

    // pour activer l'autorisation par token
    @AuthCheck(EnumRoles.ADMIN)
    @Query(() => [Reservation])
    async getReservations(): Promise<Reservation[]> {
        return await this.service.getAllReservations();
    }

    @AuthCheck(EnumRoles.ADMIN)
    @Query(() => Number)
    async getReservationCountBySearchInput(
        @Arg("searchReservationInput", { nullable: true })
        searchReservationInput: SearchReservationInput,
    ): Promise<Number> {
        return await this.service.getReservationsCountBySearchFilter(
            searchReservationInput,
        );
    }
    // pour activer l'autorisation par token
    @AuthCheck(EnumRoles.ADMIN, EnumRoles.USER)
    @Query(() => [Reservation])
    async getReservationsByUserId(
        @Arg("id") id: string,
    ): Promise<Reservation[]> {
        return await this.service.getAllReservationsByUserId(id);
    }

    @Query(() => [Reservation])
    @AuthCheck(EnumRoles.ADMIN)
    async getReservationsBySearchFilter(
        @Arg("searchReservationInput", { nullable: true })
        searchReservationInput: SearchReservationInput,
    ): Promise<Reservation[]> {
        return await this.service.getReservationsBySearchFilter(
            searchReservationInput,
        );
    }

    // pour activer l'autorisation par token
    // @Authorized()
    @AuthCheck(EnumRoles.USER)
    @Query(() => Reservation)
    async getCartReservationOfUser(
        @Arg("id") id: string,
    ): Promise<Reservation> {
        return await this.service.getCartReservationOfUserByUserId(id);
    }

    // pour activer l'autorisation par token
    // @Authorized()
    @AuthCheck(EnumRoles.USER, EnumRoles.ADMIN)
    @Query(() => Reservation)
    async getReservationById(@Arg("id") id: string): Promise<Reservation> {
        return await this.service.getOneReservationById(id);
    }

    // pour activer l'autorisation par token
    // @Authorized()
    @AuthCheck(EnumRoles.USER, EnumRoles.ADMIN)
    @Query(() => Number)
    async getProductReservationQuantityByDates(
        @Arg("getProductReservationQuantityByDatesInput", { nullable: true })
        getProductReservationQuantityByDatesInput: GetProductReservationQuantityByDatesInput,
    ): Promise<number> {
        return await this.service.getOneProductReservationQuantityByDates(
            getProductReservationQuantityByDatesInput,
        );
    }

    @AuthCheck(EnumRoles.USER, EnumRoles.ADMIN)
    @Mutation(() => Boolean)
    async deleteReservationById(@Arg("id") id: string): Promise<Boolean> {
        return await this.service.deleteOneReservationById(id);
    }

    @AuthCheck(EnumRoles.USER, EnumRoles.ADMIN)
    @Mutation(() => Reservation)
    async updateDateOfReservation(
        @Arg("id") id: string,
        @Arg("startAt") startAt: Date,
        @Arg("endAt") endAt: Date,
    ): Promise<Reservation> {
        return await this.service.updateDateOfOneReservation(
            id,
            startAt,
            endAt,
        );
    }

    @AuthCheck(EnumRoles.USER, EnumRoles.ADMIN)
    @Mutation(() => Reservation)
    async updateStatusOfReservation(
        @Arg("id") id: string,
        @Arg("status", (type) => EnumStatusReservation)
        status: EnumStatusReservation,
    ): Promise<Reservation> {
        return await this.service.updateStatusOfOneReservation(id, status);
    }

    @AuthCheck(EnumRoles.USER, EnumRoles.ADMIN)
    @Mutation(() => Reservation)
    async updateDetailFromReservation(
        @Arg("id") id: string,
        @Arg("detail", (type) => DetailReservationInput)
        detail: DetailReservationInput,
    ): Promise<Reservation> {
        return await this.service.updateDetailFromOneReservation(id, detail);
    }

    @AuthCheck(EnumRoles.USER, EnumRoles.ADMIN)
    @Mutation(() => Reservation)
    async removeProductsFromReservation(
        @Arg("id") id: string,
        @Arg("products_ids", (type) => [String]) productsIds: string[],
    ): Promise<Reservation> {
        return await this.service.removeManyProductsFromOneReservation(
            id,
            productsIds,
        );
    }

    @AuthCheck(EnumRoles.USER, EnumRoles.ADMIN)
    @Mutation(() => Reservation)
    async removeAllProductsFromReservation(
        @Arg("id") id: string,
    ): Promise<Reservation> {
        return await this.service.removeAllProductsFromOneReservation(id);
    }
}
