import React from "react";
import axios, { AxiosError } from "axios";
import { AES } from "crypto-js";
import {
  LoginFormValues,
  LoginRequest,
  LoginResponse,
} from "@/components/model/login";
import { IResponse } from "@/components/model";
import storage from "./storage";

const axiosInstance = axios.create({
  baseURL: "http://cms.chtoma.com/api",
  withCredentials: true,
  responseType: "json",
  timeout: 5000,
});
//阻拦器
axiosInstance.interceptors.request.use(
  (config) => {
    console.log(1234);
    return config;
  },
  (error) => {
    console.log(error);
  }
);

class BaseApiService {
  protected async post<T>(path: any, params: object): Promise<T> {
    console.log("base", params);

    // return axios({ url: "api/login", method: "POST", data: params });
    // return axios({ url: "/login", method: "POST", data: params });
    return axios
      .post("api/login", params)
      .then((res) => res.data)
      .catch((error) => console.log(error));
  }
}
class ApiService extends BaseApiService {
  login({
    password,
    ...rest
  }: LoginRequest): Promise<IResponse<LoginResponse>> {
    return this.post<IResponse<LoginResponse>>("/login", {
      ...rest,
      password: AES.encrypt(password, "cms").toString(),
    });
  }
}

export const apiService = new ApiService();
export default apiService;
