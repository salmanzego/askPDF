import { API } from "./api";

const handleApiResponse = (response: any) => {
    if (response && response.data && !response.error) {
        return {
            success: true,
            data: response?.data?.data,
            message: response?.data?.message,
        };
    } else {
        const error =
            response.error || new Error("Unknown error occurred");
        return { success: false, error: error.message || error.toString() };
    }
};

export const uploadPdf = async (file: File) => {
    try {
        const formData = new FormData();    
        formData.append("file", file);
        const response = await API.post(`/upload`, formData, {"Content-Type": "multipart/form-data"});
        return handleApiResponse(response);
    } catch (error) {
        return handleApiResponse({ error });
    }
};

export const getTabs = async () => {
    try {
        const response = await API.get(`/pdfs`, { "Content-Type": "application/json" });
        return handleApiResponse(response);
    } catch (error) {
        return handleApiResponse({ error });
    }
};