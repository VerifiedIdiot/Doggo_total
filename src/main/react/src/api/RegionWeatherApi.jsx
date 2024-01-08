import axios from "axios";


const BASE_URL = "/api/weather";

// 이거는 db에 처 박아둔 각 지역별 일주일 날씨 ..

export const WeatherAxiosApi = {
  getWeathers: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/get`);
      // console.log(response.data);
      return response.data; // 실제 데이터만 반환
    } catch (error) {
      console.error("Error fetching weather data", error);
      throw error; // 에러를 다시 throw하여 호출하는 컴포넌트에서 처리할 수 있도록 함
    }
  },

  
};


