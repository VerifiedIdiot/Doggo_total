import axios from "axios";

const BASE_URL = '/api/stray';

// 이거는 파이썬 크롤러로 긁어서 db에 박아놓은 데이터들을 가져오는 api
export const StrayAxiosApi = {
  getStrays: async (region) => {
    try {
      const response = await axios.get(`${BASE_URL}/get/${region}`);
      // console.log(response.data);
      return response.data; // 실제 데이터만 반환
    } catch (error) {
      console.error("Error fetching weather data", error);
      throw error; // 에러를 다시 throw하여 호출하는 컴포넌트에서 처리할 수 있도록 함
    }
  },

  
};