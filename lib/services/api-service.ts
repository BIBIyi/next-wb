import React from "react";
import axios, { AxiosError, AxiosInstance } from "axios";
import { AES } from "crypto-js";
import {
  LoginFormValues,
  LoginRequest,
  LoginResponse,
  SignUpRequest,
} from "@/lib/model/login";
import { IResponse, QueryParams } from "@/lib/model";
import storage from "./storage";
import { StudentsRequest, StudentsResponse } from "@/lib/model/students";

//阻拦器
// const baseURL = getBaseUrl();
const baseURL = "http://cms.chtoma.com/api";
const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  responseType: "json",
  timeout: 5000,
});

//拦截
axiosInstance.interceptors.request.use(function (config) {
  if (!config.url.includes("login")) {
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${storage?.token}`,
      },
    };
  }

  return config;
});

class BaseApiService {
  protected async post<T>(path: any, params: object): Promise<T> {
    return axiosInstance
      .post(path, params)
      .then((res) => res.data)
      .catch((err) => console.log(err));
  }
  protected async get<T>(path: any, params?: QueryParams): Promise<T> {
    console.log(path);
    path = !!params
      ? `${path}?${Object.entries(params)
          .map(([key, value]) => `${key}=${value}`)
          .join("&")}`
      : path;
    return axiosInstance
      .get(path)
      .then((res) => res.data)
      .catch((err) => console.log(err));
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
  loginOut(): Promise<IResponse<boolean>> {
    return this.post<IResponse<boolean>>("/logout", {});
  }
  signUP(req: SignUpRequest): Promise<IResponse<boolean>> {
    return this.post<IResponse<boolean>>("/signup", req);
  }

  getStudents(req?: StudentsRequest): Promise<IResponse<StudentsResponse>> {
    return this.get<IResponse<StudentsResponse>>(
      "/students",
      req as unknown as QueryParams
    );
  }
}

export const apiService = new ApiService();
export default apiService;
