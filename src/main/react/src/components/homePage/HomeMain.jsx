import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Introduction from "./comps/Introduction";

import CurrentLocationWeather from "./comps/currentLocationWeather/CurrentLocationWeather";
import RegionWeather from "./comps/regionWeather/RegionWeather";
import Strays from "./comps/Strays";
import CurrentAddressContext from "./CurrentAddressContext";
import Chatbot from "../service/ChatBot";
import ChatBotImg from "../../icon/ChatBot.png";

// 다른 페이지와 다른 헤더 푸터 적용방식을 위한 스타일드 컴포넌트
const GetOffHeader = styled.div`
    position: relative;
    margin-top: -3.5vw;


    @media (max-width: 1500px) {

    margin-top: -4.5vw;
    }

    @media (max-width: 1200px) {

    margin-top: -5.5vw;
    }

    @media (max-width: 1000px) {

    margin-top: -6.2vw;
    }

    @media (max-width: 768px) {
    position: static;

    }
`


const SectionContainer = styled.section.withConfig({
  className: "section-container",
})`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${(props) => props.$width || "97.8vw"};
  height: ${(props) => props.$height || "52vw"};
  background-color: ${(props) => props.$backGround || "white"};

  @media (max-width: 1500px) {

    width: 97.5vw;
  }

  @media (max-width: 1200px) {

    width: 97.2vw;
  }

  @media (max-width: 1000px) {

    width: 96.8vw;
  }

  @media (max-width: 768px) {
    height: 110vw;
    width: 93vw;
  }
`;

const StraysSectionContainer = styled(SectionContainer)`
  @media (max-width: 768px) {
    display: none;
  }
`;

const IntroductionSection = styled(SectionContainer)`
  @media (max-width: 768px) {
    display: none;
  }
`;

const ItemContainer = styled.div.attrs({
  className: "item-container",
})`
  display: flex;
  justify-content: center;
  width: ${(props) => props.$width || "100%"};
  height: ${(props) => props.$height || "30%"};
`;

export const DoggyIcon = ({ image, height }) => (
  <div className="doggy-container" style={{ width: height, height: height }}>
    <img src={image} alt="Doggy" className="img" />
  </div>
);

const ChatbotBox = styled.div`
  position: fixed;
  z-index: 11;
  height: auto;
  bottom: 6%;
  left: 10%;
  width: 20%;
  min-width: 280px;
  max-width: 450px;

  @media (max-width: 1280px) {
    left: 14%; /* 뷰포트 크기가 768px 이하일 때의 값 */
  }
  @media (max-width: 768px) {
    left: 18%; /* 뷰포트 크기가 768px 이하일 때의 값 */
        bottom: 4%;
  }
`;

const ChatbotIcon = styled.img`
  position: fixed;
  width: 5%;
  min-width: 66px;
  right: 92%;
  cursor: pointer;
  z-index: 11;
  top: 87%;
  opacity: 0.8;

  @media (max-width: 1280px) {
    right: 89%; /* 뷰포트 크기가 768px 이하일 때의 값 */
  }
  @media (max-width: 768px) {
    right: 87%; /* 뷰포트 크기가 768px 이하일 때의 값 */
        top: 89%;
        min-width: 53px;
  }
`;


const SwitchWrapper = styled.div`
  position: relative; // 절대 위치로 설정
  top: 10px; // 상단에서 10px 떨어진 위치에
  right: 10px; // 오른쪽에서 10px 떨어진 위치에 배치
  width: 50px;
  height: 20px;
  background-color: #85c6f8;
  border-radius: 25px;
  cursor: pointer;
`;


const ToggleButton = styled.div`
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  box-shadow: 2px 4px 15px 3px rgba(0, 0, 0, 0.2);

  transition: all 0.4s ease-in-out !important;
  left: ${(props) => (props.isOn ? "30px" : "0")};
`;

// 스위치 토글 버튼 컴포넌트
export const Switch = ({ isOn, onClick }) => (
  <SwitchWrapper onClick={onClick}>
    <ToggleButton isOn={isOn} />
  </SwitchWrapper>
);



const HomeMain = () => {
  const [currentAddress, setCurrentAddress] = useState(""); // 상태 정의
  const [showChatbot, setShowChatbot] = useState(false);
  const [showRegionWeather, setShowRegionWeather] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
  const weatherSectionRef = useRef(null);
  const toggleChatbot = () => {
    setShowChatbot((prev) => !prev);
  };

  const closeChatbot = () => {
    setShowChatbot(false);
  };

  const handleResize = () => {
    setIsMobileView(window.innerWidth <= 768);
  };

  const toggleWeather = () => {
    if (window.innerWidth <= 768) {
      setShowRegionWeather((prev) => !prev);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    // 컴포넌트 언마운트 시에 이벤트 리스너를 정리
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <GetOffHeader>
      <CurrentAddressContext.Provider
        value={{ currentAddress, setCurrentAddress }}
      >
        <IntroductionSection $height="100%">
          <ItemContainer  $height="100%">
          <Introduction weatherSectionRef={weatherSectionRef} />
          </ItemContainer>
        </IntroductionSection>

        <SectionContainer ref={weatherSectionRef} $height="55vw">
          <ItemContainer $height="100%">
            {isMobileView ? (
              showRegionWeather ? (
                <RegionWeather
                  isOn={showRegionWeather}
                  toggleWeather={toggleWeather}
                  isMobileView={isMobileView}
                />
              ) : (
                <CurrentLocationWeather
                  isOn={showRegionWeather}
                  toggleWeather={toggleWeather}
                  isMobileView={isMobileView}
                />
              )
            ) : (
              <>
                <CurrentLocationWeather />
                <RegionWeather />
              </>
            )}
          </ItemContainer>
        </SectionContainer>

        <StraysSectionContainer $height="50vw" >
          <ItemContainer $height="100%" $width="80%">
            <Strays />
          </ItemContainer>
        </StraysSectionContainer>
      </CurrentAddressContext.Provider>

      <ChatbotIcon
        src={ChatBotImg}
        onClick={showChatbot ? closeChatbot : toggleChatbot}
      />
      {showChatbot ? (
        <ChatbotBox>
          <Chatbot />
        </ChatbotBox>
      ) : null}
    </GetOffHeader>
  );
};

export default HomeMain;
