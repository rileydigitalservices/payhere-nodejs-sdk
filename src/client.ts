import axios, { AxiosInstance } from "axios";

import { handleError } from "./errors";

import { GlobalConfig, UserConfig } from "./common";

export function createClient(
  config: UserConfig & GlobalConfig,
  client: AxiosInstance = axios.create()): AxiosInstance {

  const basicAuthToken: string = Buffer.from(`${config.username}:${config.password}`)
                                       .toString("base64");

  client.defaults.baseURL = config.baseUrl;
  client.defaults.headers = {
    "Content-Type": "application/json",
    "Authorization": `Basic ${basicAuthToken}`,
    "APP-ID": config.appId
  };

  return withErrorHandling(client);
}

export function withErrorHandling(client: AxiosInstance): AxiosInstance {
  client.interceptors.response.use(
    response => response,
    error => Promise.reject(handleError(error))
  );

  return client;
}
