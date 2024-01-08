import React from "react";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styled from "styled-components";

function importAll(r) {
  return r.keys().map(r);
}

const images = importAll(
  require.context("../../../img/homePageImages", false, /\.(png|jpe?g|svg)$/)
);

const ItemBox = styled.div.attrs({
  className: "item-container",
})`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 101%;
  height: 100%;
`;

const Item = styled.div.attrs({
  className: "item-introduction",
})`
  width: 100%;
  height: 100%;
  overflow: hidden; // 이미지가 Item 밖으로 나가지 않도록 설정
`;

const Image = styled.img`
  width: 100vw;
  height: 50vw;
  object-fit: cover;
  overflow: hidden; // 이미지가 Item 밖으로 나가지 않도록 설정
`;

const StyledSlider = styled(Slider)`
  .slick-slide div {
    /* outline: none; // Removes the outline border that appears on click */
    object-fit: cover;
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(
    0,
    0,
    0,
    0.3
  ); // 검은색 오버레이의 불투명도를 조절할 수 있습니다.
  z-index: 2; // 이미지와 텍스트 사이에 위치하도록 z-index를 설정합니다.
`;

const CustomArrow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  ${(props) => (props.direction === "prev" ? "left: 5vw;" : "right: 5vw;")}
  width: 3vw;
  height: 3vw;
  background-color: #ed6436;
  color: white;
  border-radius: 10%;
  cursor: pointer;
  transform: translateY(-50%);
  z-index: 9;

  &:hover {
    background-color: #e84a15;
    transition: 0.15s ease-in-out;
  }

  &::before {
    content: "${(props) => (props.direction === "prev" ? "<" : ">")}";
    color: white;
    font-size: 2vw;
    font-weight: bold;
  }
`;

const StyledSlide = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const IntroTextWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  z-index: 3;
  max-width: 80vw;
  padding: 2vw;
  white-space: nowrap;
`;

const IntroTitle = styled.h2`
  font-size: 2vw;
  margin-bottom: 1vw;
  font-weight: normal;

  letter-spacing: 0.1vw;
`;

const IntroService = styled.h1`
  font-size: 4vw;
  margin-bottom: 0.5vw;
  font-weight: bold;
`;

const IntroServiceSummary = styled.p`
  font-size: 1.5vw; // 요약의 크기를 vw 단위로 조정합니다.
  margin-bottom: 1vw; // 아래 여백을 vw 단위로 조정합니다.
`;

const SubscribeButton = styled.button`
  height: 2.5vw;
  width: 7vw;
  background-color: #ed6436;
  border: none;
  border-radius: 0.3rem; // 테두리 반경을 vw 단위로 변경
  cursor: pointer;
  color: white;
  font-size: 1.25vw; // 글꼴 크기를 vw 단위로 변경
  &:hover {
    background-color: #e84a15;
    transition: all 0.15s ease-in-out;
  }
`;

const slideContent = [
  {
    title: "최고의 반려동물 서비스",
    service: "소중한 반려동물을 위한 일정관리",
    summary:
      "백신 접종부터 미용, 정기 검진까지 반려동물의 중요 일정을 관리하세요.",
    buttonText: "더보기",
    navigateTo: "/diy",
  },

  {
    title: "최고의 반려동물 서비스",
    service: "고양이와 개를 위한 최고급 사료",
    summary: "영양가 높은 최상의 사료로 반려동물의 건강을 지켜주세요.",
    buttonText: "더보기",
    navigateTo: "/quick",
  },

  {
    title: "최고의 반려동물 서비스",
    service: "날씨정보 활용한 산책지수",
    summary: "현재위치와 각 주요도시별 날씨에 따른 산책지수.",
    buttonText: "더보기",
    navigateTo: "#weather",
  },
];

const Introduction = ({ weatherSectionRef }) => {
  
  const navigate = useNavigate();
  const handleButtonClick = (navigateTo) => {
    if (navigateTo.startsWith("#")) {
      weatherSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(navigateTo);
    }
  };

  const NextArrow = ({ onClick }) => {
    return <CustomArrow direction="next" onClick={onClick} />;
  };

  const PrevArrow = ({ onClick }) => {
    return <CustomArrow direction="prev" onClick={onClick} />;
  };

  const settings = {
    speed: 1200,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <>
      <ItemBox>
        <Item>
          <StyledSlider {...settings}>
            {images.map((src, index) => {
              const content = slideContent[index];
              return (
                <StyledSlide key={index}>
                  <Image src={src} alt={`Slide ${index}`} />
                  <ImageOverlay /> {/* 이미지 위에 오버레이를 추가합니다. */}
                  <IntroTextWrapper>
                    <IntroTitle>{content.title}</IntroTitle>
                    <IntroService>{content.service}</IntroService>
                    <IntroServiceSummary>{content.summary}</IntroServiceSummary>
                    <SubscribeButton
                      onClick={() => handleButtonClick(content.navigateTo)}>
                      {content.buttonText}
                    </SubscribeButton>
                  </IntroTextWrapper>
                </StyledSlide>
              );
            })}
          </StyledSlider>
        </Item>
      </ItemBox>
    </>
  );
};

export default Introduction;
