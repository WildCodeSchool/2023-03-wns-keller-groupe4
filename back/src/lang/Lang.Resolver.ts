import { Arg, Mutation, Query, Resolver } from "type-graphql";
import LangService from "./Lang.Service";
import { Lang } from "./entity/Lang";

@Resolver()
export default class LangResolver {
    service;
    constructor() {
        this.service = new LangService();
    }

    @Mutation(() => Lang)
    async createLang(@Arg("name") name: string): Promise<Lang> {
        return await this.service.createOneLang(name);
    }

    // pour activer l'autorisation par token
    // @Authorized()
    @Query(() => [Lang])
    async getLangs(): Promise<Lang[]> {
        return await this.service.getAllLang();
    }

    // pour activer l'autorisation par token
    // @Authorized()
    @Query(() => Lang)
    async getLangById(@Arg("id") id: string): Promise<Lang> {
        return await this.service.getOneLangById(id);
    }

    @Mutation(() => Boolean)
    async updateLangById(
        @Arg("id") id: string,
        @Arg("name") name: string
    ): Promise<boolean> {
        return await this.service.updateOneLangById(id, name);
    }

    @Mutation(() => Boolean)
    async deleteLangById(
        @Arg("id") id: string
    ): Promise<Boolean> {
        return await this.service.deleteOneLangById(id);
    }
}
