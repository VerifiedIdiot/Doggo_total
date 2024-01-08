import React from "react";
import styled from "styled-components";
import feed from "../../../img/homePageImages/aboutFunction/feed.png";
import mapService from "../../../img/homePageImages/aboutFunction/mapService.png";
import schedule from "../../../img/homePageImages/aboutFunction/schedule.png";
import searchAnimal from "../../../img/homePageImages/aboutFunction/searchAnimal.png";
import stray from "../../../img/homePageImages/aboutFunction/stray.png";
import weatherService from "../../../img/homePageImages/aboutFunction/weatherService.png";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ItemBox = styled.div.attrs({
  className: "item-container",
})`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60%;
  height: 100%;
`;

const Items = styled.div.attrs({
  className: "item-about-us",
})`
  display: flex;
  justify-content: ${(props) => props.$justify || "none"};
  flex-direction: ${(props) => props.$direction || "column"};

  width: 100%;
  align-items: ${(props) => props.$align || "center"};
  width: ${(props) => props.$width || "100%"};
  height: ${(props) => props.$height || "50%"};
  padding-left: ${(props) => props.$padding || "none"};
  padding-top: ${(props) => props.$padding_top || "none"};
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30%;
  height: 90%;
  background-color: white;
`;

const TextContainer = styled.div.attrs({
  className: "text-container",
})`
  display: flex;
  flex-direction: ${(props) => props.$direction || "row"};
  justify-content: ${(props) => props.$justify || "center"};
  height: ${(props) => props.$height || "50%"};
  width: 100%;
  text-overflow: ellipsis;

  h2 {
    font-size: 1.8vw;
    color: #65c178;
  }
  h1 {
    font-size: 3.2vw;
  }
  .text-primary {
    color: #ed6436;
  }
  .text-secondary {
    color: #65c178;
  }

  h3 {
    font-size: 1.3vw;
    color: #6c757d;
  }
  p {
    font-size: 1vw;
    color: #777;
  }
`;

const TextLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  h3 {
    font-size: 2vw;

  }
  p {
    font-size: 1.1vw;


    color: #6c757d;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  }
`;

const StyledImage = styled.img`
  width: 25%; // 또는 필요에 따라 조정
  height: auto; // 이미지의 비율을 유지
  object-fit: contain; // 이미지가 컨테이너에 맞도록 조정
`;

const AboutFunctions = () => {
  return (
    <>
      <ItemBox>
        <Items $height="15%">
          <TextContainer>
            <TextLine>
              <h2>제공하는 기능들</h2>
            </TextLine>
          </TextContainer>
          <TextContainer>
            <TextLine>
              <h1>
                <span className="text-primary">애완동물을</span>{" "}
                <span>위한 최고의 서비스들</span>
              </h1>
            </TextLine>
          </TextContainer>
        </Items>
        <Items $height="40%" $direction="row" $justify="space-between">
          <ItemContainer>
            <StyledImage src={schedule} alt="Schedule" />
            <TextLine><h3>캘린더 일정관리</h3></TextLine>
            <TextLine><p>소중한 순간들을 확인하세요</p></TextLine>
          </ItemContainer>
          <ItemContainer>
            <StyledImage src={mapService} alt="Map Service" />
            <TextLine><h3>반려동물 동반 시설정보</h3></TextLine>
            <TextLine><p>함께 여정을 계획해보세요</p></TextLine>
          </ItemContainer>
          <ItemContainer>
            <StyledImage src={weatherService} alt="Weather Service" />
            <TextLine><h3>실시간 산책지수</h3></TextLine>
            <TextLine><p>날씨정보 반영 실시간 산책지수</p></TextLine>
          </ItemContainer>
        </Items>
        <Items $height="40%" $direction="row" $justify="space-between">
          <ItemContainer>
            <StyledImage src={feed} alt="Feed" />
            <TextLine><h3>반려동물을 위한 식사</h3></TextLine>
            <TextLine><p>반려동물을 위한 최고의 선택</p></TextLine>
          </ItemContainer>
          <ItemContainer>
            <StyledImage src={searchAnimal} alt="Search Animal" />
            <TextLine><h3>견종 & 묘종 도감</h3></TextLine>
            <TextLine><p>궁금한 정보들을 확인하세요</p></TextLine>
          </ItemContainer>
          <ItemContainer>
            <StyledImage src={stray} alt="Stray" />
            <TextLine><h3>유기동물 정보</h3></TextLine>
            <TextLine><p>소중한 가족이 되어주세요</p></TextLine>
          </ItemContainer>
        </Items>
      </ItemBox>
    </>
  );
};

export default AboutFunctions;
