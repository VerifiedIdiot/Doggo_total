import React, { useState } from "react";
import styled from "styled-components";
import Introduction from "./comps/Introduction";
import UserStatus from "./comps/UserStatus";
import CurrentLocationWeather from "./comps/currentLocationWeather/CurrentLocationWeather";
import RegionWeather from "./comps/regionWeather/RegionWeather";
import Strays from "./comps/Strays";
import CurrentAddressContext from "./CurrentAddressContext";
import Chatbot from "../service/ChatBot";

const fadeIn = `
  opacity: 1;
  transform: translateY(0px);
`;

const fadeOut = `
  opacity: 0;
  transform: translateY(30px);
`;

const SectionContainer = styled.section.withConfig({
  className: "section-container",
})`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vw;
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  border: 1px solid black;
`;

const ItemContainer = styled.div.attrs({
  className: "item-container",
})`
  display: flex;
  justify-content: center;
  width: 80%;
  height: ${(props) => props.$height || "30%"};
`;

const ChatbotIcon = ({ onClick }) => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        cursor: "pointer",
        zIndex: "1001",
        top: "150px",
        height: "50px",
        width: "50px",
        border: "1px solid black",
      }}
    >
      {/* 아이콘 디자인은 여기에 추가 */}
      <div onClick={onClick}>챗봇 아이콘</div>
    </div>
  );
};

const Main = () => {
  const [currentAddress, setCurrentAddress] = useState(""); // 상태 정의
  const [showChatbot, setShowChatbot] = useState(false);

  const toggleChatbot = () => {
    setShowChatbot((prev) => !prev);
  };

  const closeChatbot = () => {
    setShowChatbot(false);
  };

  return (
    <>
      <CurrentAddressContext.Provider
        value={{ currentAddress, setCurrentAddress }}
      >
        <SectionContainer>
          <ItemContainer>
            <Introduction />
            <UserStatus />
          </ItemContainer>
          <ItemContainer $height="40%">
            <CurrentLocationWeather />
            <RegionWeather />
          </ItemContainer>
          <ItemContainer>
            <Strays></Strays>
          </ItemContainer>
        </SectionContainer>
        <SectionContainer></SectionContainer>
      </CurrentAddressContext.Provider>

      <ChatbotIcon onClick={showChatbot ? closeChatbot : toggleChatbot} />

      {showChatbot ? (
        <div
          style={{
            position: "fixed",
            bottom: "70px",
            right: "20px",
            zIndex: "1000",
            top: "150px",
          }}
        >
          <Chatbot />
        </div>
      ) : null}
    </>
  );
};

export default Main;
