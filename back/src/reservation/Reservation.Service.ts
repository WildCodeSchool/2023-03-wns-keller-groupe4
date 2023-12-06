import {
    FindOptionsOrder,
    FindOptionsWhere,
    ILike,
    LessThanOrEqual,
    MoreThanOrEqual,
    Not,
    Raw,
} from "typeorm";
import { ProductService } from "../product/Product.Service";
import UserService from "../user/User.Service";
import dataSource from "../utils";
import { Between } from "typeorm";
import { EnumStatusReservation, Reservation } from "./entity/Reservation";
import CreateReservationInput from "./inputs/CreateReservationInput";
import DetailReservationInput from "./inputs/DetailReservationInput";
import GetProductReservationQuantityByDatesInput from "./inputs/GetProductReservationQuantityByDatesInput";
import { SearchReservationInput } from "./inputs/SearchReservationInput";
import { EnumProductReservationStatus } from "./entity/ReservationDetail";

export default class ReservationService {
    repository = dataSource.getRepository(Reservation);
    userService = new UserService();
    productService = new ProductService();
    relations = ["user", "reservationsDetails.product"];

    /**
     * Créer un une Reservation
     * @param CreateReservationInput
     * @returns renvois le User crée
     */
    async createOneReservation(
        createReservationInput: CreateReservationInput,
    ): Promise<Reservation> {
        try {
            const cart_already_exists =
                (await this.repository.findOne({
                    relations: this.relations,
                    where: {
                        user: {
                            id: createReservationInput.user_id,
                        },
                        status: EnumStatusReservation.IN_CART,
                    },
                })) ?? false;
            // Si le user possède déjà un panier, on jette une erreur
            if (cart_already_exists) throw new Error("User already has a cart");

            let newReservation = new Reservation();
            newReservation = {
                ...newReservation,
                ...createReservationInput,
                reservationsDetails: [],
            };
            newReservation.user = await this.userService.getOneUserById(
                createReservationInput.user_id,
            );
            return await this.repository.save(newReservation);
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    /**
     * Renvois un tableau de toutes les réservations
     * @returns Reservations[]
     */
    async getAllReservations(): Promise<Reservation[]> {
        try {
            return await this.repository.find({
                relations: this.relations,
                take: 2,
                skip: 2,
            });
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    /**
     * Renvois un tableau de toutes les réservations d'un utilisateur
     * @param id uuid de l'utilisateur qui possède les réservations
     * @returns Reservations[]
     */
    async getAllReservationsByUserId(id: string): Promise<Reservation[]> {
        try {
            return await this.repository.find({
                relations: this.relations,
                where: {
                    user: {
                        id,
                    },
                },
            });
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    /**
     * Renvois les réservations correspondant aux critères de recherche
     * @param searchInput critères de recherche
     * @returns Reservations[]
     */
    async getReservationsBySearchFilter(
        searchInput: SearchReservationInput,
    ): Promise<Reservation[]> {
        // cette fonction permet de récupérer les propriétés de searchInput et de construire l'objet where
        // et order by de typeOrm en fonction de celle-ci
        let { limit, offset, orderBy, orderDirection } = searchInput ?? {
            limit: 10,
            offset: 0,
            orderBy: "id",
            orderDirection: "ASC",
        };

        const where: FindOptionsWhere<Reservation> = {};
        let order: FindOptionsOrder<Reservation> = {
            [orderBy]: orderDirection,
        };

        if (searchInput.status === undefined) {
            where.status = where.status = Not(EnumStatusReservation.IN_CART);
        }

        if (searchInput?.status) {
            where.status = searchInput.status;
        }

        if (searchInput?.userEmail) {
            where.user = {
                email: ILike(`%${searchInput.userEmail}%`),
            };
        }

        if (searchInput?.date?.startDate) {
            where.start_at = MoreThanOrEqual(searchInput.date?.startDate);
        }

        if (searchInput?.date?.endDate) {
            where.end_at = LessThanOrEqual(searchInput.date?.endDate);
        }

        if (searchInput?.id) {
            where.id = Raw(
                (alias) => `CAST(${alias} AS TEXT) ILIKE '%${searchInput.id}%'`,
            );
        }
        // L'on doit utiliser cette syntaxe parce qu'email ne fait pas partie de l'entité réservation
        // mais de l'entité user qui est référencé dans réservation.
        if (searchInput.orderBy === "email") {
            order = {
                user: {
                    ["email"]: orderDirection,
                },
            };
        }

        try {
            return await this.repository.find({
                relations: this.relations,
                where,
                take: limit,
                skip: offset,
                order,
            });
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    async getReservationsCountBySearchFilter(
        searchInput: SearchReservationInput,
    ): Promise<number> {
        const where: FindOptionsWhere<Reservation> = {};

        if (searchInput === undefined) {
            where.status = where.status = Not(EnumStatusReservation.IN_CART);
        }

        if (searchInput?.status) {
            where.status = searchInput.status;
        }

        if (searchInput?.userEmail) {
            where.user = {
                email: ILike(`%${searchInput.userEmail}%`),
            };
        }

        if (searchInput?.date?.startDate) {
            where.start_at = MoreThanOrEqual(searchInput.date?.startDate);
        }

        if (searchInput?.date?.endDate) {
            where.end_at = LessThanOrEqual(searchInput.date?.endDate);
        }

        if (searchInput?.id) {
            where.id = Raw(
                (alias) => `CAST(${alias} AS TEXT) ILIKE '%${searchInput.id}%'`,
            );
        }

        try {
            return await this.repository.count({
                where,
            });
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    /**
     * Renvois la réservation courante, c.a.d., le panier d'un utilisateur
     * @param id uuid de l'utilisateur qui possède la reservation
     * @returns Reservation
     */
    async getCartReservationOfUserByUserId(id: string): Promise<Reservation> {
        try {
            return await this.repository.findOneOrFail({
                relations: this.relations,
                where: {
                    user: {
                        id,
                    },
                    status: EnumStatusReservation.IN_CART,
                },
            });
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    /**
     * Renvois une réservation via son id
     * @param id - uuid de la reservation a modifier
     * @returns Reservation
     */
    async getOneReservationById(id: string): Promise<Reservation> {
        try {
            return await this.repository.findOneOrFail({
                relations: this.relations,
                where: { id },
            });
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    /**
     * Renvois les détails des réservations pour un produit suivant une date de début et une date de fin
     * @param getProductReservationQuantityByDatesInput
     * @returns La quantité réservée
     */
    async getOneProductReservationQuantityByDates(
        getProductReservationQuantityByDatesInput: GetProductReservationQuantityByDatesInput,
    ): Promise<number> {
        try {
            console.log(
                "DEBUT : ",
                getProductReservationQuantityByDatesInput.start_at,
                "FIN : ",
                getProductReservationQuantityByDatesInput.end_at,
            );
            const productDetails = await this.repository.find({
                relations: this.relations,
                where: [
                    {
                        reservationsDetails: {
                            product: {
                                id: getProductReservationQuantityByDatesInput.product_id,
                            },
                            start_at: Between(
                                getProductReservationQuantityByDatesInput.start_at,
                                getProductReservationQuantityByDatesInput.end_at,
                            ),
                        },
                    },
                    {
                        reservationsDetails: {
                            product: {
                                id: getProductReservationQuantityByDatesInput.product_id,
                            },
                            end_at: Between(
                                getProductReservationQuantityByDatesInput.start_at,
                                getProductReservationQuantityByDatesInput.end_at,
                            ),
                        },
                    },
                ],
            });
            let reservedQuantity = 0;
            productDetails.forEach((reservation) => {
                console.log(
                    "PRODUCT DETAILS: ",
                    reservation.reservationsDetails,
                );
                reservation.reservationsDetails.forEach((detail) => {
                    reservedQuantity += detail.quantity;
                });
            });
            console.log(reservedQuantity);
            return reservedQuantity;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    /**
     * Supprime une entité reservation via son id
     * @param id uuid de la ligne bdd de la reservation  à supprimer
     * @returns Promise< bool> : si la suppression a bien réussi
     */
    async deleteOneReservationById(id: string): Promise<Boolean> {
        try {
            const reservationToDelete = await this.getOneReservationById(id);
            await this.repository.remove(reservationToDelete);
            return true;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    /**
     * Modifie la date d'une réservation
     * @param id - uuid de la reservation a modifer
     * @param startAt nouvelle date de début
     * @param endAt nouevlle date de fin
     * @returns renvois le nouvelle état de la reservation
     */
    async updateDateOfOneReservation(
        id: string,
        startAt: Date,
        endAt: Date,
    ): Promise<Reservation> {
        try {
            // vérifie si la date de début est bien inférieure à la date de fin
            if (startAt.getTime() >= endAt.getTime()) {
                throw new Error(
                    `Start time of the reservation can't be greater or equal to the end time : 
                    ${startAt.toISOString() + " >= " + endAt.toISOString()}`,
                );
            }
            const reservation = await this.getOneReservationById(id);
            reservation.start_at = startAt;
            reservation.end_at = endAt;
            return await this.repository.save(reservation);
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    /**
     * Modifie le status d'une réservation
     * @param id - uuid de la reservation a modifer
     * @param status - une value du status
     * @returns renvois le nouvelle état de la reservation
     */
    async updateStatusOfOneReservation(
        id: string,
        status: EnumStatusReservation,
    ): Promise<Reservation> {
        try {
            const reservation = await this.getOneReservationById(id);
            reservation.status = status;
            return await this.repository.save(reservation);
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    /**
     * Modifie la quantité des produits déjà présent et rajoute les produits non présent
     * @param id uuid de la reservation a modifer
     * @param products tableau de d'id de produit + quantité
     * @returns renvois le nouvel état de la réservation
     */
    async updateDetailFromOneReservation(
        reservation_id: string,
        detail: DetailReservationInput,
    ): Promise<Reservation> {
        try {
            const reservation = await this.getOneReservationById(
                reservation_id,
            );
            const found = reservation.reservationsDetails.find(
                (item) => item.product.id === detail.product_id,
            );
            // si notre produit existe déjà, alors on modifie juste la quantité
            if (found !== undefined) {
                found.quantity = detail.quantity;
                found.start_at = detail.start_at;
                found.end_at = detail.end_at;
            }
            // sinon on le rajoute
            else {
                reservation.reservationsDetails = [
                    ...reservation.reservationsDetails,
                    {
                        quantity: detail.quantity,
                        reservation,
                        product: await this.productService.getOneProduct(
                            detail.product_id,
                        ),
                        status: EnumProductReservationStatus.IN_PREPARATION,
                        start_at: detail.start_at,
                        end_at: detail.end_at,
                    },
                ];
            }

            //  vérifie si la date de début est bien inférieure à la date de fin
            const { start_at, end_at } = detail;
            if (start_at.getTime() >= end_at.getTime()) {
                throw new Error(
                    `Start time of the product can't be greater or equal to the end time : 
                    ${start_at.toISOString() + " >= " + end_at.toISOString()}`,
                );
            }

            this.settingGlobalReservationDate(start_at, end_at, reservation);

            return await this.repository.save(reservation);
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    /**
     * Suprime des produits de la réservation
     * @param id uuid de la reservation a modifer
     * @param products_ids tableau des id des produits à enlever
     * @returns renvois le nouvel état de la réservation
     */
    async removeManyProductsFromOneReservation(
        id: string,
        productsIds: string[],
    ): Promise<Reservation> {
        console.log("should get here in removeManyProductsFromOneReservation ");

        try {
            const reservation = await this.getOneReservationById(id);
            reservation.reservationsDetails =
                reservation.reservationsDetails.filter(
                    (detail) => !productsIds.includes(detail.product.id),
                );
            if (reservation.reservationsDetails.length > 0) {
                this.updateGlobalReservationDate(reservation);
            } else {
                this.voidReservationDate(reservation);
            }

            return await this.repository.save(reservation);
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    /**
     * Supprime tout les produits de la réservation
     * @param id uuid de la reservation a modifer
     * @returns le nouvel état de la réservation
     */
    async removeAllProductsFromOneReservation(
        id: string,
    ): Promise<Reservation> {
        try {
            const reservation = await this.getOneReservationById(id);
            reservation.reservationsDetails = [];
            this.voidReservationDate(reservation);

            return await this.repository.save(reservation);
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    private settingGlobalReservationDate(
        startDate: Date,
        endDate: Date,
        reservation: Reservation,
    ) {
        for (const detail of reservation.reservationsDetails) {
            console.log(detail.start_at, "", startDate);
            console.log(detail.end_at, "", endDate);

            if (startDate <= detail.start_at || !reservation.start_at) {
                reservation.start_at = startDate;
            }
            if (endDate >= detail.end_at || !reservation.end_at) {
                reservation.end_at = endDate;
            }
        }
    }

    private updateGlobalReservationDate(reservation: Reservation) {
        let earliestDate = reservation.reservationsDetails[0]?.start_at;
        let latestDate = reservation.reservationsDetails[0]?.end_at;

        for (const detail of reservation.reservationsDetails) {
            if (detail.start_at < earliestDate) {
                earliestDate = detail.start_at;
            }
            if (detail.end_at > latestDate) {
                latestDate = detail.end_at;
            }
        }

        reservation.start_at = earliestDate;
        reservation.end_at = latestDate;
    }

    private async voidReservationDate(reservation: Reservation) {
        // On doit faire ça ici parce qu'on ne peut pas avoir Date | null dans le type de l'entity (ça fait bugger type graphQl)
        // et si on met undefined ici lorsqu'on save la réservation ce n'est pas pris en compte.

        //@ts-ignore
        reservation.start_at = null;
        //@ts-ignore
        reservation.end_at = null;
    }
}
