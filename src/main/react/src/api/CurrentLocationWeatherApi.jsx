import axios from "axios";

const KAKAO_API_URL = "https://dapi.kakao.com/v2/local/geo/coord2address.json?";
const KAKAO_API_KEY = "KakaoAK 0ebf93ba226244249348d38c2b853898";

// 카카오에서 위도/경도 값 활용하여 주소값 삥뜯기
export const getGeocodeKakao = async (lat, lng) => {
  // console.log(lat+ " : " + lng);
  const response = await axios.get(`${KAKAO_API_URL}x=${lng}&y=${lat}`, {
    headers: {
      // 서비스키 노출 나중에 해결할것
      Authorization: KAKAO_API_KEY ,
    },
  });
  // console.log(response.data.documents[0].address.address_name);
  return response.data.documents[0].address.address_name;
};
