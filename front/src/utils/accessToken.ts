import jwtDecode from "jwt-decode";

interface IPayload {
    email: string;
    role: string;
    iat: number;
    exp: number;
}

let accessToken = "";

export const setAccessToken = (token: string) => {
    accessToken = token;
};

export const getAccessToken = () => {
    return accessToken;
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

        const { accessToken } = await response.json();

        setAccessToken(accessToken);
    } catch (error: any) {
        throw Error(error);
    }
};

export const decodeToken = (token: string) => {
    return jwtDecode<IPayload>(token);
};
