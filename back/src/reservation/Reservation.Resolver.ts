import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Reservation } from "./entity/Reservation";
import ReservationService from "./Reservation.Service";
import CreateReservationInput from "./inputs/CreateReservationInput";
import UpdateReservationInput from "./inputs/UpdateReservationInput";

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
    async updateReservationById(
        @Arg("id") id: string,
        @Arg("updateReservationInput") updateReservationInput: UpdateReservationInput
    ): Promise<Boolean> {
        return await this.service.updateOneReservationById(id, updateReservationInput);
    }

    @Mutation(() => Boolean)
    async deleteReservationById(
        @Arg("id") id: string
    ): Promise<Boolean> {
        return await this.service.deleteOneReservationById(id);
    }
}
