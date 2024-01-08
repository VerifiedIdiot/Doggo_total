import React, { useState, useEffect, useContext } from "react";
import styled, { keyframes } from "styled-components";
import { StrayAxiosApi } from "../../../api/StraysApi";
import CurrentAddressContext from "../CurrentAddressContext";

const STRAY_DETAIL_URL =
  "https://www.animal.go.kr/front/awtis/public/publicDtl.do?desertionNo=";


const slide = keyframes`
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-50%);
  }
`;

const TextContainer = styled.div`
  display: flex;
  width: 99%;
  height: 20%;
  justify-content: ${(props) => props.$justy || "none"};
  margin-top: ${(props) => props.$topMargin || "0"};
  h1 {
    font-size: 1.5vw;
    margin-bottom: 1vw;
    color: #5f6061;
  }
  p {
    font-size: 1vw;
    color: #9399a2ff;
  }
`

const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 98.5%;
  
  border-radius: 8px;
`;

const SliderTrack = styled.div`
  display: flex;
  height: 100%;
  width: calc(40vw * ${(props) => props.$extendedStraysLength});
  animation: ${slide} 5760s linear infinite;
`;

const Banner = styled.div`
  height: 10%;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: rgb(234, 236, 239);
`;

const Slide = styled.div`
  width: 10vw;
  height: 60%;
  margin-right: 0.5vw;
  padding: 0;
  cursor: pointer;

  img {
    width: 100%;
    height: 40%;
    border-radius: 8px 8px 0 0;
    object-fit: cover;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const InfoArea = styled.div`
  height: 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1vw;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 0 0 10px 10px;
  background-color: rgb(234, 236, 239);
  p {
    font-size: .8vw;
  }
`;

const Strays = () => {
  const [strays, setStrays] = useState([]);
  const { currentAddress } = useContext(CurrentAddressContext);
  const extendedStrays = [...strays, ...strays];

  useEffect(() => {
    const loadStrays = async () => {
      try {
        // currentAddress를 공백으로 나누어 배열 생성
        const addressParts = currentAddress.split(" ");
        // 배열의 첫 번째 요소 사용
        const region = addressParts[0];

        const data = await StrayAxiosApi.getStrays(region);
        // console.log(data);
        setStrays(data);
      } catch (error) {
        console.error("Error fetching strays:", error);
      }
    };

    if (currentAddress) {
      loadStrays();
    }
  }, [currentAddress]);

  const handleSlideClick = (url) => {
    window.open(url, "_blank");
  };

  return (
    <>
      <SliderContainer>
     
      <img src="https://www.animal.go.kr/front/images/sub/sub01_04_img.png" alt="resque strays"></img>
      <TextContainer $justy="center" $topMargin="3vw"><h1>개나 고양이를 키우고 싶다면 유기동물 보호시설에서 보호하고 있는 유기동물을 입양하는게 어떨까요?</h1></TextContainer>
      <TextContainer $justy="center"><h1>원하는 동물을 새 식구로 맞이하는 것은 물론 한 생명을 구했다는 자부심으로 가슴이 뿌듯해집니다.</h1></TextContainer>
      <TextContainer>
        <p>※ 해당 유기동물 정보들은 사용자의 현재위치를 바탕으로 합니다.</p>
      </TextContainer>
      <TextContainer>
        <p>※ 해당 유기동물 이미지 클릭시 상세 페이지로 이동.</p>
      </TextContainer>
        <Banner />
        <SliderTrack $extendedStraysLength={extendedStrays.length}>
          {extendedStrays.map((stray, index) => (
            <Slide
              key={index}
              onClick={() =>
                handleSlideClick(STRAY_DETAIL_URL + stray.animalNumber)
              }>
              <img src={stray.imageLink} alt={`Stray ${stray.breed}`} />
              <InfoArea>
                <p>보호소 위치: {stray.city}</p>
                <p>{stray.breed}</p>
              </InfoArea>
            </Slide>
          ))}
        </SliderTrack>
      </SliderContainer>
    </>
  );
};

export default Strays;
