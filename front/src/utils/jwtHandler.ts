import jwtDecode from "jwt-decode";

interface IPayload {
    email: string;
    role: string;
    iat: number;
    exp: number;
}

let IDToken = "";

export const setIDToken = (token: string) => {
    IDToken = token;
};

export const getIDToken = () => {
    return IDToken;
};

export const refreshToken = async () => {
    try {
        const response = await fetch(
            `${process.env.REACT_APP_SERVER_URL}/refresh_token`,
            {
                method: "POST",
                credentials: "include",
            },
        );

        const { IDToken } = await response.json();

        setIDToken(IDToken);
    } catch (error: any) {
        throw Error(error);
    }
};

export const decodeToken = (token: string) => {
    return jwtDecode<IPayload>(token);
};
