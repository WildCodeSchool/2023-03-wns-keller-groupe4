import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Invoice } from "./entity/Invoice";
import InvoiceService from "./Invoice.Service";
import CreateInvoiceInput from "./inputs/CreateInvoiceInput";
import CreateUserBillingInput from "../userBilling/inputs/CreateUserBillingInput";

@Resolver()
export default class InvoiceResolver {
    service;
    constructor() {
        this.service = new InvoiceService();
    }

    @Mutation(() => Invoice)
    async createInvoice(
        @Arg("createInvoiceInput") createInvoiceInput: CreateInvoiceInput,
        @Arg("createUserBillingInput") createUserBillingInput: CreateUserBillingInput
    ): Promise<Invoice> {
        return await this.service.createOneInvoice(createInvoiceInput, createUserBillingInput);
    }

    // pour activer l'autorisation par token
    // @Authorized()
    @Query(() => [Invoice])
    async getInvoices(): Promise<Invoice[]> {
        return await this.service.getAllInvoices();
    }

    // pour activer l'autorisation par token
    // @Authorized()
    @Query(() => Invoice)
    async getInvoiceById(@Arg("id") id: string): Promise<Invoice> {
        return await this.service.getOneInvoiceById(id);
    }

    // pour activer l'autorisation par token
    // @Authorized()
    @Query(() => Invoice)
    async getInvoiceByIdReservation(@Arg("idReservation") idReservation: string): Promise<Invoice> {
        return await this.service.getOneInvoiceByIdReservation(idReservation);
    }

    // pour activer l'autorisation par token
    // @Authorized()
    // Update
    @Mutation(() => Invoice)
    async updateInvoiceById(
        @Arg("id") id: string,
        @Arg("createInvoiceInput") createInvoiceInput: CreateInvoiceInput
    ): Promise<Invoice> {
        return await this.service.updateOneInvoiceById(id, createInvoiceInput);
    }

    @Mutation(() => Boolean)
    async deleteInvoiceById(
        @Arg("id") id: string
    ): Promise<Boolean> {
        return await this.service.deleteOneInvoiceById(id);
    }
}
