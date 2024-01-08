import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AxiosApi from "../../api/Axios";

// 전체 컨테이너에 대한 스타일드 컴포넌트
const Container = styled.div`
  width: 100%;

  ::before {
    content: "";
    position: absolute;
    bottom: 6px; /* 말풍선 꼬리를 아래로 위치시킴 */
    left: -4%; /* 말풍선 꼬리 위치 조절 */
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 10px 18px 15px 0; /* 말풍선 꼬리의 크기 조절 */
    border-color: transparent #f3eeea transparent transparent; /* 말풍선 꼬리의 색상 설정 */
  }
  .chat {
    background-color: #f0f0f0;
    overflow: hidden;
    border-radius: 8px;
  }
`;

// 채팅 메시지와 스크롤바가 있는 컨테이너에 대한 스타일드 컴포넌트
const ChatboxContainer = styled.div`
  width: 100%;
  height: 350px;
  overflow-y: auto;
  padding: 8px;
  box-sizing: border-box;
  scrollbar-width: thin;
  scrollbar-color: #f95001 #f1f1f1;

  /* 스크롤바에 대한 일반적인 스타일을 설정합니다. */
  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #f95001;
    border-radius: 5px;
  }

  &::-webkit-scrollbar-track {
    background-color: lightgray;
  }
`;

// 입력 필드와 전송 버튼이 있는 컨테이너에 대한 스타일드 컴포넌트
const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  box-sizing: border-box;
`;

// 입력 필드에 대한 스타일드 컴포넌트
const Input = styled.input`
  width: calc(100% - 60px);
  height: 40px;
  padding: 5px;
  border: none;
  border-radius: 7px 0px 0px 7px;
  box-sizing: border-box;
`;

// 전송 버튼에 대한 스타일드 컴포넌트
const SendButton = styled.button`
  width: 60px;
  height: 40px;
  border: none;
  background-color: #f95001;
  color: white;
  font-weight: bold;
  border-radius: 0px 7px 7px 0px;
  cursor: pointer;
`;

const BotMessage = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 8px;
  margin: 4px;
  text-align: left;
  justify-items: start;
`;
const Boxleft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
`;

const UserMessage = styled.div`
  background-color: #f95001;
  color: white;
  border-radius: 8px;
  padding: 8px;
  margin: 4px;
  text-align: right;
`;

const Boxright = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
`;

const Image = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 5px; /* 이미지에 원하는 모양을 주기 위한 스타일 설정 */
`;

const WelcomeContainer = styled.div`
  background-color: #f95001;
  color: white;
  border-radius: 8px;
  padding: 8px;
  margin: 4px;
  text-align: center;

  .Welcome {
    font-size: 13px;
  }

  @media (max-width: 1280px) {
    .Welcome {
      font-size: 12px;
    }
  }
`;

const WelcomeButtons = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 8px;
`;

const WelcomeButton = styled.button`
  margin: 0 8px;
  padding: 5px;
  width: 120px;
  background-color: #f0f0f0;
  color: #f95001;
  border: 1px solid #f95001;
  border-radius: 4px;
  font-size: 9px;
  cursor: pointer;

  @media (max-width: 1280px) {
    font-size: 8px;
  }
`;

const Chatbot = () => {
  // 채팅창 메시지와 사용자 입력 상태를 관리하는 상태변수
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [showWelcome, setShowWelcome] = useState(true);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [clickedButtonNumber, setClickedButtonNumber] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messages]);

  // 환영 메시지 버튼 클릭을 처리하는 함수
  const handleWelcomeButtonClick = (buttonNumber) => {
    console.log(buttonNumber);
    // 버튼에 따라 다른 동작 수행
    if (buttonNumber === 1) {
      // 1번 버튼 클릭 시 동작
      addMessage("검색할 묘종의 이름을 입력하세요.", "bot");
    } else if (buttonNumber === 2) {
      // 2번 버튼 클릭 시 동작
      addMessage("검색할 견종의 이름을 입력하세요.", "bot");
    } else if (buttonNumber === 3) {
      // 3번 버튼 클릭 시 동작.
      addMessage("멍냥일기 페이지로 이동합니다.", "bot");

      setTimeout(() => {
        navigate("/diy");
      }, 1000);
    } else if (buttonNumber === 4) {
      // 4번 버튼 클릭 시 동작
      addMessage("고객센터 페이지로 이동합니다.", "bot");

      setTimeout(() => {
        navigate("/service");
      }, 1000);
    }

    // 버튼이 클릭되면 환영 메시지와 버튼을 숨김
    setButtonClicked(true);
    setClickedButtonNumber(buttonNumber);
    setShowWelcome(false);
  };

  // 채팅창을 스크롤하기 위한 ref
  const chatContainerRef = useRef(null);

  // 사용자 입력 메시지를 메시지 목록에 추가하는 함수
  const addMessage = (text, sender = "user") => {
    setMessages((prevMessages) => [...prevMessages, { text, sender }]);
  };

  // 사용자 입력이 변경될 때 호출되는 함수
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  // 사용자가 메시지를 보낼 때 호출되는 함수
  const handleSendMessage = async() => {
    if (inputText.trim() === "") return;

    // 사용자가 입력한 메시지를 채팅창에 추가
    addMessage(inputText, "user");

    // 사용자 입력을 처리하고 챗봇 응답 생성
    const response = await generateBotResponse(inputText);

    // 챗봇 응답을 채팅창에 추가
    addMessage(response, "bot");

    // 입력창 초기화
    setInputText("");
  };

  // 챗봇 응답 생성 함수
  const generateBotResponse = async (InputText) => {
      // 버튼이 클릭되지 않았을 때는 빈 응답 반환
      if (!buttonClicked) {
        return "도움이 필요한 항목을 선택하여 다시 질문해주세요";
      }

      // 간단한 패턴 매칭을 통해 사용자 입력에 따른 응답 생성
      const lowercaseInput = InputText.toLowerCase();

      if (clickedButtonNumber === 1) {
        try {
          const response = await AxiosApi.catSearch(lowercaseInput);
          // API 응답에 따른 동작 수행
          const catInfo = response.data;
          console.log(response.data);
          // '치와와'에 관한 정보와 버튼을 포함한 응답 생성
          return (
           <chat1>
                         {catInfo.korean_name}에 관한 정보입니다.
                         <ul style={{ listStyleType: "none" }}>
                           <li>
                             <Image src={catInfo.image_link} alt={catInfo.name} />
                           </li>
                           <li>크기: {catInfo.length}</li>
                           <li>
                             체중: {catInfo.min_weight}~{catInfo.max_weight} 파운드
                           </li>
                         </ul>{" "}
                       </chat1>
          );
        } catch (error) {
          console.error("Error fetching cat information:", error);
          return "해당하는 묘종을 찾을 수 없습니다.";
        }
      } else if (clickedButtonNumber === 2) {
        try {
                  const response = await AxiosApi.dogSearch(lowercaseInput);
                  // API 응답에 따른 동작 수행
                  const dogInfo = response.data;
                  console.log(response.data);
                  // '치와와'에 관한 정보와 버튼을 포함한 응답 생성
                  return (
                    <chat1>
                      {dogInfo.korean_name}에 관한 정보입니다.
                      <ul style={{ listStyleType: "none" }}>
                        <li>
                          <Image src={dogInfo.image_link} alt={dogInfo.name} />
                        </li>
                        <li>
                          기대수명: {dogInfo.min_life_expectancy}~
                          {dogInfo.max_life_expectancy}년
                        </li>
                        <li>
                          수컷 크기: {dogInfo.min_height_male}~{dogInfo.max_height_male}{" "}
                          인치
                        </li>
                        <li>
                          암컷 크기: {dogInfo.min_height_female}~
                          {dogInfo.max_height_female} 인치
                        </li>
                        <li>
                          수컷 체중: {dogInfo.min_weight_male}~{dogInfo.max_weight_male}{" "}
                          파운드
                        </li>
                        <li>
                          암컷 체중: {dogInfo.min_weight_female}~
                          {dogInfo.max_weight_female} 파운드
                        </li>
                      </ul>{" "}
                    </chat1>
                  );
                } catch (error) {
                  console.error("Error fetching cat information:", error);
                  return "해당하는 견종을 찾을 수 없습니다.";
                }
      } else if (clickedButtonNumber === 3) {
        // 3번 버튼에 대한 응답 처리
      } else if (clickedButtonNumber === 4) {
        // 4번 버튼에 대한 응답 처리
      }
    };

  // 렌더링
  return (
    <Container>
      <div className="chat">
        {showWelcome && (
          <WelcomeContainer>
            <p className="Welcome">
              PETMEMOIR의 챗봇입니다. 어떤 도움이 필요하신가요?
            </p>
            <WelcomeButtons>
              <WelcomeButton onClick={() => handleWelcomeButtonClick(1)}>
                묘종검색
              </WelcomeButton>
              <WelcomeButton onClick={() => handleWelcomeButtonClick(2)}>
                견종검색
              </WelcomeButton>
              <WelcomeButton onClick={() => handleWelcomeButtonClick(3)}>
                멍냥일기
              </WelcomeButton>
              <WelcomeButton onClick={() => handleWelcomeButtonClick(4)}>
                고객센터
              </WelcomeButton>
            </WelcomeButtons>
          </WelcomeContainer>
        )}

        <ChatboxContainer ref={chatContainerRef}>
          {messages.map((message, index) => (
            <div key={index} style={{ paddingBottom: "8px" }}>
              {message.sender === "bot" ? (
                <Boxleft>
                  <BotMessage>
                    <strong>동물박사:</strong> {message.text}
                  </BotMessage>
                </Boxleft>
              ) : (
                <Boxright>
                  <UserMessage>
                    <strong>사용자:</strong>
                    {message.text}
                  </UserMessage>
                </Boxright>
              )}
            </div>
          ))}
        </ChatboxContainer>
        <InputContainer>
          <Input
            className="chatbox"
            placeholder="궁금한 정보를 자유롭게 물어보세요"
            type="text"
            value={inputText}
            onChange={handleInputChange}
          />
          <SendButton className="sendbtn" onClick={handleSendMessage}>
            전송
          </SendButton>
        </InputContainer>
      </div>
    </Container>
  );
};

export default Chatbot;
