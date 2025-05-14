import axios from "axios";

axios.defaults.baseURL = "http://localhost:3002";

const successRes = (data: any) => ({ data, error: null });
const errorRes = (error: any) => ({ data: null, error });

const get = async (
    path: string,
    headers?: any,
) => {
    try {
        const resp = await axios.get(path, {
            headers: headers || { "Content-Type": "application/json"},
        });
        return successRes(resp.data);
    } catch (error) {
        return errorRes(error);
    }
};

const post = async (
    path: string,
    body?: any,
    headers?: any,
) => {
    try {
        const resp = await axios.post(path, body, {
            headers: headers || { "Content-Type": "application/json" },
        });
        return successRes(resp.data);
    } catch (error) {
        return errorRes(error);
    }
};

export const API = { get, post };

