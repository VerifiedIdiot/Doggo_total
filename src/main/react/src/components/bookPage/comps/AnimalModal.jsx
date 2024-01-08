import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";

const ModalOverlay = styled.div`
  display: ${(props) => (props.$isOpen ? "flex" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: relative;
  background: white;
  padding: 20px;
  border-radius: 8px;
  display: flex;

  width: 70vw;
  height: 35vw;
  z-index: 99999;

  @media (max-width: 768px) {
    width: 80vw;
    height: 100vw;
    flex-direction: column;
  }
`;

const ImageSection = styled.div`
  width: 90%;
  height: 99%;
  background: url(${(props) => props.src}) no-repeat center center;
  background-size: cover;
  border-radius: 8px;
  box-shadow: 2px 4px 15px 3px rgba(0, 0, 0, 0.2);
  @media (max-width: 768px) {
    width: 100%;
    height: 50%;
  }
`;

const ContentSection = styled.div`
  display: flex;

  flex-direction: column;

  width: 50%;
  height: 100%;
  padding-left: 2%;

  @media (max-width: 768px) {
    width: 100%;
    height: 50%;
  }
`;

export const BreedNameSection = styled.div`
  display: flex;

  flex-direction: column;

  width: 100%;
  height: 20%;

  h1 {
    font-size: 2vw;
  }
  h2 {
    font-size: 1.5vw;
    color: #a3a1a1;
  }

  @media (max-width: 768px) {
    
    align-items: center;
    margin-top: 1%;
    height: 10%;
    h1 {
      font-size: 5vw;
    }
    h2 {
      font-size: 4vw;
      color: #a3a1a1;
    }
  }
`;

export const BreedInfoSection = styled.div`
  display: flex;

  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  height: 80%;

  @media (max-width: 768px) {
    
    
    margin-top: 5%;
   

  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;

  @media (max-width: 768px) {
    
    top: 1px;
    right: 1px;
    
  }
`;

const ProgressBarContainer = styled.div`
  background-color: #e0e0e0;
  border-radius: 8px;
  height: 1vw;
`;

const ProgressBar = styled.div`
  background-color: #4caf50;
  height: 100%;
  border-radius: 8px;
  transition: width 1.5s ease-in-out;
  @media (max-width: 768px) {
    height: 150%;
  }
`;


const ProgressLabel = styled.span`
  font-size: 1.5vw;
  @media (max-width: 768px) {
    font-size: 4vw; // 화면 너비가 768px 이하일 때 폰트 크기 조정
  }
`;

export const AnimalAttributeBar = ({ label, value }) => {
  const [barWidth, setBarWidth] = useState(0);

  useEffect(() => {
    // 컴포넌트가 마운트된 후에 프로그레스 바의 너비를 설정합니다
    const timeoutId = setTimeout(() => {
      setBarWidth((value / 5) * 100); // value 값을 백분율로 변환
    }, 100); // 지연 시간을 조절할 수 있습니다

    return () => clearTimeout(timeoutId);
  }, [value]);
  
  return (
    <>
      <ProgressLabel>{label}</ProgressLabel>
      <ProgressBarContainer>
      <ProgressBar style={{ width: `${barWidth}%` }} />
      </ProgressBarContainer>
    </>
  );
};

const AnimalModal = ({ $isOpen, $onClose, imageSrc, children }) => {
  // esc 누르면 모달창 종료
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        $onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [$onClose]);

  return (
    <>
      <ModalOverlay $isOpen={$isOpen} onClick={$onClose}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <CloseButton onClick={$onClose}>&times;</CloseButton>
          <ImageSection src={imageSrc} />
          <ContentSection>{children}</ContentSection>
        </ModalContent>
      </ModalOverlay>
    </>
  );
};

export default AnimalModal;
