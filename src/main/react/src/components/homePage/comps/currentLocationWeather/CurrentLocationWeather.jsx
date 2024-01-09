import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import {
  dfs_xy_conv,
  onSuccess,
  onError,
} from "./CurrentLocationWeatherFunction";
import { getGeocodeKakao } from "../../../../api/CurrentLocationWeatherApi";

import {
  fantasticWeather,
  normalWeather,
  badWeather,
} from "../../../../img/weather";
import CurrentAddressContext from "../../CurrentAddressContext";
// import { useLoading } from "../../../../context/LoadingContext";
import { Switch } from "../../HomeMain";

const ItemBox = styled.div.attrs({
  className: "item-container",
})`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Items = styled.div.attrs({
  className: "item-currentWeather",
})`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 97%;
  height: 90%;
  
  border-radius: 5px;
    @media (max-width: 768px) {
      height: 100%;
      width: 100%;
    }
`;

const TopBox = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  height: 40%;
  width: 100%;
  position: relative;
  border-radius: 8px;
  box-shadow: 2px 4px 15px 3px rgba(0, 0, 0, 0.2);
`;

const TextArea = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 65%;
`;

const TextContainer = styled.div.attrs({
  className: "text-container",
})`
  position: relative;
  display: flex;
  flex-direction: ${(props) => props.$direction || "row"};
  justify-content: ${(props) => props.$justify || "none"};
  align-items: ${(props) => props.$justify || "center"};
  padding-left: 1vw;
  height: ${(props) => props.$height || "30%"};
  width: ${(props) => props.$width || "100%"};
  text-overflow: ellipsis;

  h2 {
    font-size: 2.2vw;
  }
  h1 {
    font-size: 5vw;
  }
  .text-primary {
    color: #ed6436;
  }
  .text-secondary {
    color: #65c178;
  }

  h3 {
    font-size: 1.3vw;
    color: #9399a2ff;
  }
  h4 {
    font-size: 2vw;
    color: #9399a2ff;
  }
  p {
    font-size: 1vw;
    color: #9399a2ff;
  }

  @media (max-width: 768px) {
    h2 {
      font-size: 5vw;
    }
    h1 {
      font-size: 9vw;
      margin-left: 1vw;
    }
    h3 {
      font-size: 3vw;
    }

    p {
      font-size: 3vw;
    }
  }
  &.hide-on-mobile {
    @media (max-width: 768px) {
      display: none;
    }
  }
`;

const WeatherIconContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 35%;
  position: relative;

  img {
    width: 100%;
    height: 70%;
    object-fit: contain;
  }
  p {
    font-size: 1.5vw;
    color: #9399a2ff;
  }

  .weather-good {
    color: limegreen;
  }

  .weather-bad {
    color: red;
  }
  @media (max-width: 768px) {
    p {
      font-size: 5vw;
    }
    img {
      margin-top: 15px;
      width: 100%;
      height: 70%;
      object-fit: contain;
    }
  }
`;

const HourlyWeatherInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 27%;
  background-color: rgb(234, 236, 239);
  border-radius: 8px;
  box-shadow: 2px 4px 15px 3px rgba(0, 0, 0, 0.2);
  overflow-x: auto;
  @media (max-width: 768px) {
    overflow-x: hidden;
  }
`;

const HourlyWeatherCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
  min-width: 5vw;
  border: 0.3px solid #ddd;
  /* border-radius: 10px; */

  h3 {
    font-size: 2vw;
    font-weight: bold;
    color: #9399a2ff;
    padding-left: 0.5vw;
  }
  p {
    font-size: 1vw;
    color: #9399a2ff;
  }
  img {
    width: 4vw;
    height: 4vw;
  }

  .weather-good {
    color: #65c178;
  }

  .weather-bad {
    color: red;
  }

  @media (max-width: 768px) {
    min-width: 19vw;
    img {
      width: 9vw;
      height: 9vw;
    }
    h3 {
      font-size: 4vw;
      font-weight: bold;
      color: black;

    }

    p {
      font-size: 4vw;
    }
  }
`;

const WeatherDetail = styled.div`
  display: flex;
  flex-direction: column;
  height: 30%;
  width: 100%;
  background-color: rgb(234, 236, 239);
  border-radius: 8px;
  box-shadow: 2px 4px 15px 3px rgba(0, 0, 0, 0.2);
`;

const WeatherDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: ${(props) => props.$align || "center"};

  height: ${(props) => props.$height || "50%"};
  width: 100%;
`;

const WeatherDetailBox = styled.div`
  display: flex;
  width: 100%;
  height: 50%;

  align-items: center;
`;

const SwitchPosition = styled.div`
  position: absolute;
  top: 1vw; // 필요에 따라 조절하세요
  right: .8vw; // 필요에 따라 조절하세요
  z-index: 10; // 다른 내용물 위에 오도록 설정
`;

const CurrentLocationWeather = ({ isOn, toggleWeather, isMobileView }) => {
  // 리액트 라이브러리로 위도경도를 구하는 훅
  const [location, setLocation] = useState({ lat: 0, long: 0 });
  // api 요청을 통해 정보획들 실패 에러 스테이트훅
  const [error, setError] = useState(null);
  // 카카오 api에서 위도경도로 주소값 얻어오는 스테이트훅
  const [address, setAddress] = useState("");
  // 기상청에 전달할 지리정보를 구하는 스테이트 훅
  const [coords, setCoords] = useState("");
  // 파이썬에서 넘어온 실시간 기상정보 스테이트훅
  const [currentWeather, setCurrentWeather] = useState("");
  // 파이썬에서 넘어온 현재시간 이후 24시간 날씨정보 스테이트훅
  const [hourlyWeather, setHourlyWeather] = useState([]);
  // 좋음/나쁨 표현을 위한 스테이트훅
  const [dailyWeatherCondition, setDailyWeatherCondition] = useState(null);

  // 현재 위치값을 메인페이지에 한해서 공유하는 컨테스트훅
  const { setCurrentAddress } = useContext(CurrentAddressContext);
  // 비동기 작업 지연시 등장할 로더 관리 훅
  // const { setIsLoading } = useLoading();

  // 리액트 라이브러리를 통해 위도/경도를 얻어오는 이펙트훅
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => onSuccess(position, setLocation),
      (error) => onError(error, setError)
    );
    // console.log(location);
  }, []);

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);
  // 카카오 api에 위도/경도를 통해 주소값을 얻어오는 이펙트훅
  useEffect(() => {
    const updateAddress = async () => {
      try {
        // setIsLoading(true);
        const addr = await getGeocodeKakao(location.lat, location.long);
        setAddress(addr);
        setCurrentAddress(addr); // 메인페이지 한해서 전역적으로 쓰기 위해 할당
      } catch (error) {
        console.error("Kakao Geocoding error:", error);
      }
    };
    // 실시간 위도/경도 정보가 바뀔시, 재차 카카오 api 요청 및 x 값 y 값 요청
    if (location.lat && location.long) {
      updateAddress();
      setCoords(dfs_xy_conv("toXY", location.lat, location.long));
    }
  }, [location.lat, location.long, setCurrentAddress]);

  // 플라스크서버로 xy값과 함께 api 요청을 하는 이펙트훅
  useEffect(() => {
    const updateWeather = async () => {
      if (coords.x && coords.y) {
        try {
          // 로더 발동
          // const text = setIsLoading(true);
          // console.log(text);
          // 두 API 요청을 동시에 호출
          const currentWeatherResponse = axios.get(
//             `http://127.0.0.1:5000/api/weather2?x=${coords.x}&y=${coords.y}` // 로컬
            `https://127.0.0.1:5000/api/weather2?x=${coords.x}&y=${coords.y}` // 보안처리된 원격서버
          );
          const hourlyWeatherResponse = axios.get(
//             `http://127.0.0.1:5000/api/hourly_weather?x=${coords.x}&y=${coords.y}` // 로컬
            `https://127.0.0.1:5000/api/hourly_weather?x=${coords.x}&y=${coords.y}` // 보안처리된 원격서버
          );

          // 모든 요청이 완료될 때까지 기다림
          const [currentWeather, hourlyWeatherData] = await Promise.all([
            currentWeatherResponse,
            hourlyWeatherResponse,
          ]);

          // 상태 업데이트
          setCurrentWeather(currentWeather.data);
          setHourlyWeather(hourlyWeatherData.data);
          // console.log(currentWeather.data);
          // console.log(hourlyWeatherData.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          // setIsLoading(false);
        }
      }
    };

    updateWeather();
  }, [coords]);

  // 날씨 상태값 0 ~ 7 을 바탕으로 맑은경우 산책 지수 좋음 , 아닌경우 나쁨
  useEffect(() => {
    if (currentWeather && Object.keys(hourlyWeather).length > 0) {
      const firstHourlyKey = Object.keys(hourlyWeather)[0];
      const firstHourlyWeather = hourlyWeather[firstHourlyKey];

      if (
        currentWeather.condition.includes("비") ||
        currentWeather.condition.includes("눈")
      ) {
        setDailyWeatherCondition("나쁨");
      } else if (
        firstHourlyWeather.sky === "흐림" ||
        firstHourlyWeather.sky === "구름많음"
      ) {
        setDailyWeatherCondition("보통");
      } else {
        setDailyWeatherCondition("좋음");
      }
    }
  }, [currentWeather, hourlyWeather]);

  // 날짜 정보를 12시간 단위의 오전오후로 만들기
  const formatTime = (key) => {
    let timeString = key.slice(8, 10) + ":" + key.slice(10, 12);
    const hour = parseInt(timeString.slice(0, 2), 10);
    const amPm = hour >= 12 ? "오후" : "오전";
    const formattedHour = hour % 12 || 12;
    return formattedHour + timeString.slice(2) + " " + amPm;
  };

  return (
    <>
      <ItemBox>
        <Items>
          <TopBox>
            {isMobileView && (
              <SwitchPosition>
                <Switch isOn={isOn} onClick={toggleWeather} />
              </SwitchPosition>
            )}
            <TextArea>
              <TextContainer className="hide-on-mobile">
                <h4>일일 산책지수</h4>
              </TextContainer>
              <TextContainer>
                <h2>{address}</h2>
              </TextContainer>
              <TextContainer $height="10%" className="hide-on-mobile">
                <h3>현재 온도</h3>
              </TextContainer>
              <TextContainer $height="60%">
                <h1>{currentWeather.temperature}</h1>
              </TextContainer>
            </TextArea>

            <WeatherIconContainer>
              <img
                src={
                  dailyWeatherCondition === "좋음"
                    ? fantasticWeather
                    : dailyWeatherCondition === "보통"
                    ? normalWeather
                    : badWeather
                }
                alt="확인요망"
              />
              <p
                className={
                  dailyWeatherCondition === "좋음"
                    ? "weather-good"
                    : dailyWeatherCondition === "나쁨"
                    ? "weather-bad"
                    : ""
                }>
                {dailyWeatherCondition}
              </p>
            </WeatherIconContainer>
          </TopBox>

          <HourlyWeatherInfo>
            {Object.keys(hourlyWeather).map((key) => {
              const data = hourlyWeather[key];
              const displayTime = formatTime(key);

              // 각 시간별 날씨 상태에 따른 변수 설정
              const weatherCondition =
                data.condition !== "강수없음"
                  ? "나쁨"
                  : data.sky === "흐림" || data.sky === "구름많음"
                  ? "보통"
                  : "좋음";

              return (
                <HourlyWeatherCard key={key}>
                  <p>{displayTime}</p>
                  <img
                    src={
                      data.condition !== "강수없음"
                        ? badWeather
                        : data.sky === "흐림" || data.sky === "구름많음"
                        ? normalWeather
                        : fantasticWeather
                    }
                    alt="확인요망"
                  />
                  <p
                    className={
                      weatherCondition === "좋음"
                        ? "weather-good"
                        : weatherCondition === "나쁨"
                        ? "weather-bad"
                        : ""
                    }>
                    {weatherCondition}
                  </p>
                  <h3>{data.temperature}</h3>
                </HourlyWeatherCard>
              );
            })}
          </HourlyWeatherInfo>

          <WeatherDetail>
            <WeatherDetailContainer $height="20%">
              <TextContainer>
                <p>세부정보</p>
              </TextContainer>
            </WeatherDetailContainer>

            <WeatherDetailContainer $height="40%" $align="none">
              <WeatherDetailBox>
                <TextContainer>
                  <h3>습도</h3>
                </TextContainer>
                <TextContainer>
                  <h3>풍속</h3>
                </TextContainer>
              </WeatherDetailBox>
              <WeatherDetailBox>
                <TextContainer>
                  <h2>{currentWeather.humidity}</h2>
                </TextContainer>
                <TextContainer>
                  <h2>{currentWeather.wind}</h2>
                </TextContainer>
              </WeatherDetailBox>
            </WeatherDetailContainer>

            <WeatherDetailContainer $height="40%" $align="none">
              <WeatherDetailBox>
                <TextContainer>
                  <h3>강수형태</h3>
                </TextContainer>
                <TextContainer>
                  <h3>시간당 강수량</h3>
                </TextContainer>
              </WeatherDetailBox>
              <WeatherDetailBox>
                <TextContainer>
                  <h2>{currentWeather.condition}</h2>
                </TextContainer>
                <TextContainer>
                  <h2>{currentWeather.rain}</h2>
                </TextContainer>
              </WeatherDetailBox>
            </WeatherDetailContainer>
          </WeatherDetail>
        </Items>
      </ItemBox>
    </>
  );
};

export default CurrentLocationWeather;
