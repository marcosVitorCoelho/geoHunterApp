import SessionConstants from "../../src/constants/SessionConstants";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosRequestConfig } from "axios";

axios.defaults.headers["Content-Type"] = "application/json";

declare module "axios" {
    export interface AxiosInstance {
        request<T>(config: AxiosRequestConfig): Promise<T>;
        get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
        delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
        head<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
        post<T>(
            url: string,
            data?: any,
            config?: AxiosRequestConfig | any
        ): Promise<T>;
        put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
        patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    }
}

export const buildAxios = (config?: AxiosRequestConfig) => {
    const axiosInstance = axios.create(config);

    axiosInstance.interceptors.request.use(async (config) => {
        try {
            const token = await AsyncStorage.getItem(SessionConstants.ACCESS_TOKEN_COOKIE_KEY);
            if (token) {
                config.headers.Authorization = `bearer ${token}`;
            } else {
                return config;
            }
        } catch (error) {
            console.log(error);
        }
        return config;
    });

    return axiosInstance;
};

console.log(process.env.baseAPI)

export const apiBase = buildAxios({
    baseURL: process.env.baseAPI,
});