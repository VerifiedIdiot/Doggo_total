import axios from "axios";

const BASE_URL = '/api';

// 동물도감 리스트 가져오기
export const getAnimals = async (animalType, page, size) => {
  try {
    const response = await axios.get(`${BASE_URL}/${animalType}/view/list`, {
      params: { page, size }
    });
    return response.data;
  } catch (error) {
    console.error('Fetching animals data failed:', error);
    throw error;
  }
};

// 해당 품종 상세정보 가져오기
export const getDetails = async (animalType, korean_name) => {
  try {
    const response = await axios.get(`${BASE_URL}/${animalType}/detail/${korean_name}`);
    return response.data;
  } catch (error) {
    console.error('Fetching animals data failed:', error);
    throw error;
  }
};

// 특정 키워드 검색, 키워드 관련 품종 리스트 반환
export const getSearchedAnimals = async (animalType, searchQuery) => {
  try {
    const response = await axios.get(`${BASE_URL}/${animalType}/view/search`, {
      params: { keyword: searchQuery }
    });
    return response.data;
  } catch (error) {
    console.error('Fetching animals data failed:', error);
    throw error;
  }
};
