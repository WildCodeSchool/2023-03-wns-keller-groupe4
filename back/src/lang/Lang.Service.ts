import dataSource from "../utils";
import { Lang } from "./entity/Lang";

export default class LangService {
    /**
     * Créer une entité Lang
     * @param name nom/alias à donner à notre Lang (ex: FR, EN, IT etc..)
     * @returns
     */
    async createOneLang(name: string): Promise<Lang> {
        try {
            return await dataSource.getRepository(Lang).save({ name });
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    /**
     * Récupère un tablea de tout les entités Lang dans la bdd
     * @returns un talbeau d'object Lang
     */
    async getAllLang(): Promise<Lang[]> {
        return await dataSource.getRepository(Lang).find();
    }

    /**
     * Récupère une entité Lang via son id
     * @param id uudi de l'entité à récupérer
     * @returns un object Lang
     */
    async getOneLangById(id: string): Promise<Lang> {
        return await dataSource
            .getRepository(Lang)
            .findOneOrFail({ where: { id } });
    }

    /**
     * Modifie le nom de la Lang via son id
     * @param id uuid de l'entité Lang à modifier
     * @param name le nouveau nom/alias à attribuer
     * @returns
     */
    async updateOneLangById(id: string, name: string): Promise<boolean> {
        try {
            await dataSource.getRepository(Lang).update({ id }, { name });
            return true;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    /**
     * Supprime une entité lang via son id
     * @param id uuid de la ligne bdd de la lang à supprimer
     * @returns Promise< bool> : si la suppression a bien réussi
     */
    async deleteOneLangById(id: string): Promise<Boolean> {
        try {
            const langToDelete = await this.getOneLangById(id);
            await dataSource.getRepository(Lang).remove(langToDelete);
            return true;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
}
