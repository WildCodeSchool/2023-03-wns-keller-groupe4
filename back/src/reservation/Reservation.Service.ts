import { ProductService } from "../product/Product.Service";
import UserService from "../user/User.Service";
import dataSource from "../utils";
import { EnumStatusReservation, Reservation } from "./entity/Reservation";
import CreateReservationInput from "./inputs/CreateReservationInput";
import DetailReservationInput from "./inputs/DetailReservationInput";


export default class ReservationService {
    repository = dataSource.getRepository(Reservation);
    userService = new UserService();
    productService = new ProductService();
    relations = ["user", "reservationsDetails.product"]

    /**
     * Créer un une Reservation 
     * @param CreateReservationInput 
     * @returns renvois le User crée
    */
    async createOneReservation(createReservationInput: CreateReservationInput): Promise<Reservation> {
        try {
            //  vérifie si la date de début est bien inférieure à la date de fin
            const { start_at, end_at } = createReservationInput;
            if (start_at.getTime() >= end_at.getTime()) {
                throw new Error(
                    `Start time of the reservation can't be greater or equal to the end time : 
                    ${start_at.toISOString() + ' >= ' + end_at.toISOString()}`
                )
            }

            const newReservation = { ...createReservationInput, reservationsDetails: [] };
            newReservation.user = await this.userService.getOneUserById(createReservationInput.user.id);
            return await this.repository.save({ ...newReservation });
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
                relations: this.relations
            });
        } catch (err: any) {
            console.log()
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
                        id
                    }
                },
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
                        id
                    },
                    status: EnumStatusReservation.BUILDING
                },
            })
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    /**
     * Renvois une résservation via son id
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
    async updateDateOfOneReservation(id: string, startAt: Date, endAt: Date): Promise<Reservation> {
        try {
            // vérifie si la date de début est bien inférieure à la date de fin
            if (startAt.getTime() >= endAt.getTime()) {
                throw new Error(
                    `Start time of the reservation can't be greater or equal to the end time : 
                    ${startAt.toISOString() + ' >= ' + endAt.toISOString()}`
                )
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
    async updateStatusOfOneReservation(id: string, status: EnumStatusReservation): Promise<Reservation> {
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
    async updateDetailFromOneReservation(reservation_id: string, detail: DetailReservationInput): Promise<Reservation> {
        try {
            const reservation = await this.getOneReservationById(reservation_id);
            const found = reservation.reservationsDetails.find((item) => item.product.id === detail.product_id);
            // si notre produit existe déjà, alors on modifie juste la quantité
            if (found !== undefined) {
                found.quantity = detail.quantity;
                found.start_at = detail.start_at;
                found.end_at = detail.end_at;
            }
            // sinon on le rajoute 
            else reservation.reservationsDetails = [...reservation.reservationsDetails, {
                quantity: detail.quantity,
                reservation,
                product: await this.productService.getOneProduct(detail.product_id),
                start_at: detail.start_at,
                end_at: detail.end_at,
            }]

            //  vérifie si la date de début est bien inférieure à la date de fin
            const { start_at, end_at } = detail;
            if (start_at.getTime() >= end_at.getTime()) {
                throw new Error(
                    `Start time of the product can't be greater or equal to the end time : 
                    ${start_at.toISOString() + ' >= ' + end_at.toISOString()}`
                )
            }

            return await this.repository.save(reservation);
        } catch (err: any) {
            throw new Error(err.message)
        }
    }

    /**
     * Suprime des produits de la réservation
     * @param id uuid de la reservation a modifer
     * @param products_ids tableau des id des produits à enlever
     * @returns renvois le nouvel état de la réservation
    */
    async removeManyProductsFromOneReservation(id: string, productsIds: string[]): Promise<Reservation> {
        try {
            const reservation = await this.getOneReservationById(id);
            reservation.reservationsDetails = reservation.reservationsDetails.filter(detail => !productsIds.includes(detail.product.id))
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
    async removeAllProductsFromOneReservation(id: string): Promise<Reservation> {
        try {
            const reservation = await this.getOneReservationById(id);
            reservation.reservationsDetails = [];
            return await this.repository.save(reservation);
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
}
