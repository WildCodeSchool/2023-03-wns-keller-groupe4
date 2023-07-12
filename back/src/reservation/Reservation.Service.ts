import dataSource from "../utils";
import { Reservation } from "./entity/Reservation";
import CreateReservationInput from "./inputs/CreateReservationInput";
import UpdateReservationInput from "./inputs/UpdateReservationInput";


export default class UserService {

    /**
     * Créer un une Reservation 
     * @param CreateReservationInput 
     * @returns renvois le User crée
    */
    async createOneReservation(createReservationInput: CreateReservationInput): Promise<Reservation> {
        try {
            return await dataSource
                .getRepository(Reservation)
                .save({ ...createReservationInput });
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
            return await dataSource.getRepository(Reservation).find();
        } catch (err: any) {
            console.log()
            throw new Error(err.message);
        }
    }

    /**
     * Renvois un tableau de toutes les réservations
     * @returns Reservations[] 
    */
     async getAllReservationsByUserId(): Promise<Reservation[]> {
        return [new Reservation()]
    }

    /**
     * Renvois une résservation via son id
     * @param id - uuid de l'user a modifier
     * @returns Reservation
    */
    async getOneReservationById(id: string): Promise<Reservation> {
        try {
            return await dataSource.getRepository(Reservation).findOneOrFail({
                where: { id },
            });
        } catch (err: any) {
            throw new Error(err.message);
        }
    }


    /**
     * Modifie une réservation
     * @param id - uuid de la reservation  a modifier
     * @param updateReservationInput 
     * @returns - true si la modification a réussi, sinon renvois une erreur
    */
    async updateOneReservationById(id: string, updateReservationInput: UpdateReservationInput): Promise<Boolean> {
        try {
            if(id === "")
                return false;
            else return true;
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
            await dataSource.getRepository(Reservation).remove(reservationToDelete);
            return true;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
}
