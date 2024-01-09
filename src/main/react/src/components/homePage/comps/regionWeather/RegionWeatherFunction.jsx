import styled from "styled-components";

import {
  sunny,
  cloudy,
  fullCloud,
  rainy,
  snowy,
} from "../../../../img/weather";

export const citiesData = [
  { name: "서울", gridRow: 6, gridColumn: 8 },
  { name: "춘천", gridRow: 5, gridColumn: 11 },
  { name: "강릉", gridRow: 7, gridColumn: 15 },
  { name: "수원", gridRow: 9, gridColumn: 9 },
  { name: "청주", gridRow: 10, gridColumn: 13 },
  { name: "안동", gridRow: 13, gridColumn: 15 },
  { name: "전주", gridRow: 15, gridColumn: 9 },
  { name: "대전", gridRow: 13, gridColumn: 11 },
  { name: "대구", gridRow: 17, gridColumn: 12 },
  { name: "울산", gridRow: 17, gridColumn: 16 },
  { name: "목포", gridRow: 22, gridColumn: 6 },
  { name: "광주", gridRow: 20, gridColumn: 8 },
  { name: "여수", gridRow: 22, gridColumn: 10 },
  { name: "부산", gridRow: 21, gridColumn: 15 },
  { name: "제주", gridRow: 29, gridColumn: 7 },
];

export const getCurrentDate = () => {
  const today = new Date();
  const year = String(today.getFullYear());
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return year + month + day;
};

export const getWeekDays = () => {
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    const formattedDate = `${date.getFullYear()}${String(
      date.getMonth() + 1
    ).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
    dates.push(formattedDate);
  }
  return dates;
};

export const formatDateWithDay = (dateString) => {
  const year = parseInt(dateString.substring(0, 4), 10);
  const month = parseInt(dateString.substring(4, 6), 10);
  const day = parseInt(dateString.substring(6, 8), 10);

  const date = new Date(year, month - 1, day);
  const today = new Date();

  const dayOfWeekKorean = ["일", "월", "화", "수", "목", "금", "토"];
  const dayOfWeek = dayOfWeekKorean[date.getDay()];

  if (date.toDateString() === today.toDateString()) {
    return (
      <>
        <div>{dayOfWeek}</div>
        <div>오늘</div>
      </>
    );
  } else {
    return (
      <>
        <div>{dayOfWeek}</div>
        <div>
          {month}.{day}
        </div>
      </>
    );
  }
};

const CityContainer = styled.div`
  margin: 0;
  padding: 0;
  grid-row: ${(props) => props.gridRow};
  grid-column: ${(props) => props.gridColumn};
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 1vw;
  position: relative;
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 3vw;
  }
`;

const WeatherIcon = styled.img`
  margin-top: -2.3vw;
  width: 3vw !important;
  height: 3vw !important;

  @media (max-width: 768px) {
    margin-top: -3.9vw;
    width: 5vw !important;
    height: 5vw !important;
  }
`;

const CityName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1vw; // 기본 폰트 크기
  color: #000; // 기본 텍스트 색상

  @media (max-width: 768px) {
    font-size: 3vw; // 화면이 768px 이하일 때 폰트 크기
  }
`;

export const CityComponent = ({ city, weather, isMorning }) => {
  const gridRow = city.gridRow;
  const gridColumn = city.gridColumn;

  if (!weather) {
    return <div></div>; // 또는 다른 오류 처리
  }

  const temperature = isMorning
    ? weather.morningTemperature
    : weather.afternoonTemperature; // 아침 OR 오후
  const weatherCondition = isMorning
    ? weather.morningWeatherCondition
    : weather.afternoonWeatherCondition; // 아침 OR 오후

  let weatherIconSrc;
  switch (weatherCondition) {
    case "맑음":
      weatherIconSrc = sunny;
      break;
    case "흐림":
      weatherIconSrc = cloudy;
      break;
    case "구름많음":
      weatherIconSrc = fullCloud;
      break;
    case "비":
      weatherIconSrc = rainy;
      break;
    case "눈":
      weatherIconSrc = snowy;
      break;
    default:
      weatherIconSrc = cloudy;
  }

  return (
    <CityContainer gridRow={gridRow} gridColumn={gridColumn}>
      <WeatherIcon src={weatherIconSrc} alt="Weather Icon" />
      <CityName>
        {city.name}
        {`${temperature}°`}
      </CityName>
    </CityContainer>
  );
};
