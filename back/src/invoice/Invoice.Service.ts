import { ProductService } from "../product/Product.Service";
import UserService from "../user/User.Service";
import { UserBilling } from "./UserBilling";
import ReservationService from "../reservation/Reservation.Service";
import { Invoice } from "./entity/Invoice";
import createInvoiceInput from "./inputs/CreateInvoiceInput";
import updateUserBillingInput from "./inputs/UpdateUserBillingInput";
import dataSource from "../utils";


export default class InvoiceService {
    repository = dataSource.getRepository(Invoice);
    userService = new UserService();
    reservationService = new ReservationService();
    relations = ["user", "reservation", "UserBilling"]

    /**
     * Créer une facture 
     * @param createInvoiceInput 
     * @returns renvois la facture créée
    */
    async createOneInvoice(
        createInvoiceInput: createInvoiceInput, 
        updateUserBillingInput: updateUserBillingInput
    ): Promise<Invoice> {
        try {
            let newInvoice = new Invoice();
            newInvoice = { ...newInvoice, ...createInvoiceInput }
            newInvoice.user = await this.userService.getOneUserById(createInvoiceInput.user_id);
            newInvoice.reservation = await this.reservationService.getOneReservationById(createInvoiceInput.reservation_id);    
            let userBilling = new UserBilling();
            userBilling = { ...userBilling, ...updateUserBillingInput };
            let invoiceCreated = await this.repository.save(newInvoice);
            userBilling.invoice = invoiceCreated;
            let userBillingCreated = await dataSource.getRepository(UserBilling).save(userBilling);
            if(!userBillingCreated) {
                throw new Error("Erreur lors de la création de l'adresse de facturation");
            }
            return invoiceCreated;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    /**
     * Renvois un tableau de toutes les factures
     * @returns Invoice[] 
    */
    async getAllInvoices(): Promise<Invoice[]> {
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
     * Renvois un tableau de toutes les factures d'un utilisateur
     * @param id uuid de l'utilisateur qui possède les factures
     * @returns Invoice[] 
    */
    async getAllInvoicesByUserId(id: string): Promise<Invoice[]> {
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
     * Renvois une facture via son id
     * @param id - uuid de la facture à rechercher
     * @returns Invoice
    */
    async getOneInvoiceById(id: string): Promise<Invoice> {
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
     * Met à jour une facture via son id
     * @param id uuid de la facture à mettre à jour
     * @param createInvoiceInput
     * @returns Invoice
     */
    async updateOneInvoiceById(id: string, createInvoiceInput: createInvoiceInput): Promise<Invoice> {
        try {
            const invoiceToUpdate = await this.getOneInvoiceById(id);
            const updatedInvoice = { ...invoiceToUpdate, ...createInvoiceInput };
            return await this.repository.save(updatedInvoice);
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    /**
     * Supprime une entité invoice via son id
     * @param id uuid de la ligne bdd de la facture à supprimer
     * @returns Promise< bool> : si la suppression a bien réussi
    */
    async deleteOneInvoiceById(id: string): Promise<Boolean> {
        try {
            const invoiceToDelete = await this.getOneInvoiceById(id);
            await dataSource.getRepository(UserBilling).remove(invoiceToDelete.UserBilling);
            await this.repository.remove(invoiceToDelete);
            return true;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
}
