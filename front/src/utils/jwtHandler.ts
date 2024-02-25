import jwtDecode from "jwt-decode";

interface IPayload {
    email: string;
    userId: string;
    firstname: string;
    lastname: string;
    role: string;
    iat: number;
    exp: number;
}

let IDToken = "";
let accessToken = "";

export const setIDToken = (token: string) => {
    IDToken = token;
};

export const setAccessToken = (token: string) => {
    accessToken = token;
};

export const getIDToken = () => {
    return IDToken;
};

export const getAccessToken = () => {
    return accessToken;
};

export const refreshToken = async () => {
    try {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/refresh_token`,
            {
                method: "POST",
                credentials: "include",
            },
        );

        const { tokens } = await response.json();

        setIDToken(tokens.IDToken);
        setAccessToken(tokens.accessToken);
    } catch (error: any) {
        throw Error(error);
    }
};

export const decodeToken = (token: string) => {
    return jwtDecode<IPayload>(token);
};
