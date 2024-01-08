import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckDouble } from "@fortawesome/free-solid-svg-icons";
import goldenRetriver from "../../../img/homePageImages/aboutUs/goldenRetriver.png";
import twoDoggo from "../../../img/homePageImages/aboutUs/twoDoggo.png";
import Kittens from "../../../img/homePageImages/aboutUs/Kittens.png";

const ItemBox = styled.div.attrs({
  className: "item-container",
})`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60%;
  height: 100%;
`;

const Items = styled.div.attrs({
  className: "item-about-us",
})`
  display: flex;
  flex-direction: column;

  width: 100%;
  align-items: ${(props) => props.$align || "center"};
  width: ${(props) => props.$width || "50%"};
  height: 90%;
  padding-left: ${(props) => props.$padding || "none"};
  padding-top: ${(props) => props.$padding_top || "none"};
`;

const TextContainer = styled.div.attrs({
  className: "text-container",
})`
  display: flex;
  flex-direction: ${(props) => props.$direction || "row"};
  justify-content: ${(props) => props.$justify || "none"};
  height: ${(props) => props.$height || "10%"};
  width: 100%;
  text-overflow: ellipsis;
  
  
  h2 {
    font-size: 1.5vw;
    color: #65c178;
  }
  h1 {
    font-size: 3.1vw;
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
    color:#777;
  }

`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  font-size: 1.3vw; 
  color: #65c178;
  -webkit-font-smoothing: antialiased;
`;

const TextLine = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  p {
    font-size: 1.3vw;
    font-weight: bold;
    margin-left: 1vw;
    color: #181818;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
  }
`;

const LearnMoreButton = styled.button`
  display: flex; // Flex 컨테이너로 설정
  align-items: center; // 자식 요소들을 수직 중앙으로 정렬
  justify-content: center; // 자식 요소들을 수평 중앙으로 정렬
  height: 2.5vw;
  width: 7vw;
  background-color: #ed6436;
  border: none;
  border-radius: 0.3rem;
  cursor: pointer;
  color: white;
  font-size: 1.25vw;
  /* margin-top: 3.1vw; */
  &:hover {
    background-color: #e84a15;
    transition: all 0.15s ease-in-out;
  }
`;

const ImageBox = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  height: ${(props) => props.$height || "100%"};
  margin: 0; // 이미지 사이의 마진 제거
  padding: 0; // 이미지 사이의 패딩 제거
  margin-left: 5vw;
`;

const Imagefirst = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  width: 100%;

  height: ${(props) => props.$height || "60%"};
  margin: 0; // 상단 이미지의 마진 제거
  padding: 0; // 상단 이미지의 패딩 제거
`;

const ImageBoxHalf = styled.div`
  display: flex;
  width: 100%;

  height: ${(props) => props.$height || "40%"};
  margin: 0; // 상단 이미지의 마진 제거
  padding: 0; // 상단 이미지의 패딩 제거
`;

const SmallImageBox = styled.div`
  display: flex;
  flex-direction: column;

  width: 50%;
`;

const StyledImage = styled.img`
  width: 100%;
  object-fit: contain;
  margin: 0; // 상단 이미지의 마진 제거
  padding: 0; // 상단 이미지의 패딩 제거
`;

const StyledImageHalf = styled.img`
  width: 100%;
  object-fit: contain;
  margin: 0; // 상단 이미지의 마진 제거
  padding: 0; // 상단 이미지의 패딩 제거
`;

const AboutUs = () => {

const navigate = useNavigate();
const handleLearnMoreClick = () => {
    navigate('/login'); // '/login' 경로로 이동
  };
  return (
    <ItemBox>
      <Items $align="none" $padding="none" $width="50%" $padding_top="2.9vw">
        <TextContainer $height="10%">
          <h2>About Us</h2>
        </TextContainer>
        <TextContainer $height="20%">
          <h1>
            <span className="text-primary">반려동물</span>과{" "}
            <span className="text-secondary">동행</span>
          </h1>
        </TextContainer>
        <TextContainer $height="15%">
          <h3>
           당신과 반려동물의 동행을 위한, 스마트한 솔루션을 제공합니다.<br/>
           우리의 기술로 반려동물과의 시간이 더욱 특별해집니다.
          </h3>
        </TextContainer>
        <TextContainer $height="15%">
          <p>
          저희 앱은 단순한 관리를 넘어서, 반려동물과 깊이 있는 관계를 만들어갈 수 있도록 개발되었습니다.
          매 순간 최적의 정보와 서비스를 제공함으로써, 당신과 반려동물의 삶에 기쁨과 행복을 가져다줍니다.
          </p>
        </TextContainer>
        <TextContainer $height="19.5%" $direction="column" $justify="center">
          <TextLine>
          <StyledFontAwesomeIcon icon={faCheckDouble} />
            <p>매일을 더욱 편리하게</p>
          </TextLine>
          <TextLine>
          <StyledFontAwesomeIcon icon={faCheckDouble} />
            <p>지속적인 업데이트</p>
          </TextLine>
          <TextLine>
          <StyledFontAwesomeIcon icon={faCheckDouble} />
            <p>합리적인 구독 서비스</p>
          </TextLine>
        </TextContainer>
        <TextContainer $height="10%">
          <LearnMoreButton onClick={handleLearnMoreClick}>더보기</LearnMoreButton>
        </TextContainer>
      </Items>

      <Items $width="40%">
        <ImageBox>
          <Imagefirst>
            <StyledImage src={goldenRetriver} alt="Golden Retriever" />
          </Imagefirst>

          <ImageBoxHalf>
            <SmallImageBox>
              <StyledImageHalf src={twoDoggo} alt="Shiba" />
            </SmallImageBox>
            <SmallImageBox>
              <StyledImageHalf src={Kittens} alt="Kittens" />
            </SmallImageBox>
          </ImageBoxHalf>
        </ImageBox>
      </Items>
    </ItemBox>
  );
};

export default AboutUs;
