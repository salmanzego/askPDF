import { API } from "./api";

const handleApiResponse = (response: any) => {
    if (response && response.data && !response.error) {
        return {
            success: true,
            data: response.data,
            message: response?.data?.message,
        };
    } else {
        const error =
            response.error || new Error("Unknown error occurred");
        return { success: false, error: error.message || error.toString() };
    }
};

export const getMessage = async (message: string) => {
    try {
        const getMessage = await API.post(`/query?q=${message}`);
        return handleApiResponse(getMessage);
    } catch (error) {
        return handleApiResponse({ error });
    }
};