import axios from "axios";
import {
  getAccessToken,
  getAuthType,
  getRefreshToken,
  setAccessToken,
} from "./services/authService";

const instance = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});
instance.interceptors.request.use(
  (config) => {
    const token: string | null = getAccessToken();
    const authType: string | null = getAuthType();
    if (token && authType) {
      // config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
      config.headers!.authorization = token;
      config.headers!.authType = authType; // for Node.js Express back-end
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (originalConfig.url !== "/user/login" && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const rs = await instance.post(`user/refresh-token`, {
            refreshToken: getRefreshToken(),
          });
          const access_token: string = rs.data.payload;
          setAccessToken(access_token);
          return instance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(err);
  }
);
export default instance;
