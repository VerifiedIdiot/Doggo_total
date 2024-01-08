import axios from "axios";
import Common from "./Common";

const AxiosInstance = axios.create({
  // axios 인스턴스 생성
  baseURL: "",
});

AxiosInstance.interceptors.request.use(
  // 요청 인터셉터 추가
  async (config) => {
    const accessToken = Common.getAccessToken();
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error); // 에러 발생시
  }
);

AxiosInstance.interceptors.response.use(
  // 응답 인터셉터 추가
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      // 401 에러 발생시
      console.log("401에러 발생!! 토큰 재발급시작!")
      const newToken = await Common.handleUnauthorized();
      if (newToken) {
        // 재시도
        error.config.headers.Authorization = `Bearer ${Common.getAccessToken()}`;
        return AxiosInstance.request(error.config);
      }
    }
    return Promise.reject(error);
  }
);

export default AxiosInstance;