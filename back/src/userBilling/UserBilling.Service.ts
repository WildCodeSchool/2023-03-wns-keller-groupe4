import { UserBilling } from "./entity/UserBilling";
import updateUserBillingInput from "./inputs/UpdateUserBillingInput";
import dataSource from "../utils";


export default class UserBillingService {
    repository = dataSource.getRepository(UserBilling);
    relations = ["invoice"];

    /**
     * Renvois une adresse de facturation via son id
     * @param id - uuid de l'adresse de facturation à rechercher
     * @returns UserBilling
    */
    async getOneUserBillingById(id: string): Promise<UserBilling> {
        try {
            return await this.repository.findOneOrFail({
                relations: this.relations,
                where: {id: id }
            });
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    /**
     * Met à jour une adresse de facturation via son id
     * @param id uuid de l'adresse de facturation à mettre à jour
     * @param updateUserBillingInput
     * @returns UserBilling
     */
    async updateOneUserBillingById(id: string, updateUserBillingInput: updateUserBillingInput): Promise<UserBilling> {
        try {
            const userBillingToUpdate = await this.getOneUserBillingById(id);
            const updatedUserBilling = { ...userBillingToUpdate, ...updateUserBillingInput };
            return await this.repository.save(updatedUserBilling);
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
}
