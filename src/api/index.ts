import axios, {
  AxiosRequestConfig as AxiosRequestConfigType,
  AxiosResponse,
} from "axios";
import Qs, { IStringifyOptions } from "qs";
import { handleError, handleSuccess } from "./responseHandlers";

type SuccessCallback = (data: any) => string;

declare module "axios" {
  export interface AxiosRequestConfig {
    arrayFormat?: IStringifyOptions["arrayFormat"];
    cache?: boolean;
    errorMsg?: string;
    successMsg?: string | SuccessCallback;
    toPublicApi?: boolean;
    ttl?: number;
    withReq?: boolean;
  }
}

const api = axios.create({
  timeout: 20000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Requested-With": "XmlHttpRequest",
  },
});

const ls = localStorage;

const ttlIsExpired = (ttl: string) => new Date().getTime() > parseInt(ttl, 10);

const getCacheKeys = (config: AxiosRequestConfigType) => {
  const key = `${config.method}:${config.url}`;
  const ttlKey = `${key}:TTL`;
  return { key, ttlKey };
};

const getTTL = (ttl: number | undefined): number => {
  const currentTime = new Date().getTime();
  if (ttl) return currentTime + ttl;
  const anHour = 1000 * 60 * 60;
  return currentTime + anHour * 24;
};

const requestInterceptor = {
  onFulfilled: (_config: AxiosRequestConfigType) => {
    const config = Object.assign(_config);

    _config.paramsSerializer = {
      encode: (params) =>
        Qs.stringify(params, {
          arrayFormat: config.arrayFormat ? config.arrayFormat : "brackets",
        }),
    };

    const userToken = ls.getItem("token") || null;

    if (userToken) config.headers.Authorization = `Bearer ${userToken}`;

    if (!config.toPublicApi)
      config.url = `${process.env.REACT_APP_API_BASE_URL || ""}${config.url}`;

    if (config.cache) {
      const { key, ttlKey } = getCacheKeys(config);
      const ttl = ls.getItem(ttlKey);
      if (config.refresh || (ttl && ttlIsExpired(ttl))) {
        ls.removeItem(key);
        ls.removeItem(ttlKey);
      }
      const data = ls.getItem(key);
      if (data) {
        return {
          headers: {},
          method: config.method,
          url: `ls-cache:${config.url}`,
          cachedData: JSON.parse(data),
        };
      }
    }

    // Add an interceptor to refresh the access token if it has expired
    const refreshInterceptor = axios.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: any) => {
        const originalRequest = error.config;

        // Check if the error is due to an expired access token
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          // Refresh the access token
          return api
            .post("/refreshToken", { token: userToken })
            .then((response) => {
              const newToken = response.data.token;
              ls.setItem("token", newToken);

              // Update the original request with the new access token
              originalRequest.headers.Authorization = `Bearer ${newToken}`;

              // Retry the original request
              return api(originalRequest);
            })
            .catch((error) => {
              // Handle the error
              return Promise.reject(error);
            });
        }

        // Handle other errors
        return Promise.reject(error);
      }
    );

    // Add the refresh interceptor to the config
    config.refreshInterceptor = refreshInterceptor;

    return config;
  },
  onRejected: (err: any) => Promise.reject(err),
};

const responseInterceptor = {
  onFulfilled: (res: AxiosResponse): any => {
    const { config: _config } = res;
    const { ...config } = res.config;

    if (config.cache) {
      const { key, ttlKey } = getCacheKeys(config);
      ls.setItem(ttlKey, JSON.stringify(getTTL(config.ttl)));
      ls.setItem(key, JSON.stringify(res.data));
    }

    const successMsg = (_config.successMsg as SuccessCallback)?.(res.data);
    if (successMsg) {
      handleSuccess(successMsg.toString());
    }
    return config.withReq && res;
  },

  onRejected: (err: any) => {
    const cachedData = err?.config?.cachedData;
    const errorMsg = err?.config?.errorMsg;

    if (cachedData) {
      return Promise.resolve(cachedData);
    }

    handleError(err, errorMsg);
    return Promise.reject(err);
  },
};

api.interceptors.request.use(
  requestInterceptor.onFulfilled,
  requestInterceptor.onRejected
);
api.interceptors.response.use(
  responseInterceptor.onFulfilled,
  responseInterceptor.onRejected
);

export default api;
