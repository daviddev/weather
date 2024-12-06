import axios, { AxiosError, AxiosInstance } from "axios";

const API_ID = "eac9585d49ae64be4c892a088b136324";
const API_URL = "https://api.openweathermap.org";

const instance: AxiosInstance = axios.create({ baseURL: API_URL });

instance.interceptors.request.use((config) => {
    config.params.appid = API_ID;

    return config;
});

instance.interceptors.response.use(
    (response) => {
        return { success: true, data: response.data };
    },
    (error: AxiosError) => {
        return {
            success: false,
            message: error.response?.data?.message || "Internal Server Error"
        };
    }
);

export const Api = {
    fetchCities: async (params: { q: string; limit: number }) => {
        return await instance.get("/geo/1.0/direct", { params });
    },
    fetchDetails: async (params: {
        lat: number;
        lon: number;
        units: string;
        limit: number;
    }) => {
        return await instance.get("/data/2.5/weather", { params });
    }
};
