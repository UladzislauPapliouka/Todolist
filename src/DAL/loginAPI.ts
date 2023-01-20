import {instance} from "./instanceConfig";
import {ResponseType} from "../types";

export type LoginParamsType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha?: string
}
export const LoginAPI = {
    login(data: LoginParamsType) {
        return instance.post<ResponseType<{ userId?: number }>>("/auth/login", data)
    },
    authMe() {
        return instance.get<ResponseType<{ id: number, email: string, login: string }>>("/auth/me")
    },
    logout() {
        return instance.delete<ResponseType<object>>("/auth/login")
    }
}