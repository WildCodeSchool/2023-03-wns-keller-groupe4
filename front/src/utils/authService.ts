import { AUTH_CLIENT } from "./constants";

export interface IClientData {
    email: string;
    token: string;
    role: string;
}


/**
 * @returns supprime les infos actuel du client, surtout le token
 */
function logout() {
    localStorage.removeItem(AUTH_CLIENT);
}

/**
 * @returns récupère les infos actuel du client, surtout le token
 */
function getClientData(): IClientData|null  {
    const userItem = localStorage.getItem(AUTH_CLIENT)
    if(userItem)
        return JSON.parse(userItem);
    else return null;
}

/**
 * @returns définit les infos actuel du client, surtout le token
 */
 function login(data: IClientData): void {
    localStorage.setItem(AUTH_CLIENT, JSON.stringify(data))
}

const AuthService = {
    logout,
    login,
    getClientData,
}

export default AuthService;