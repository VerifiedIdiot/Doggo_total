import styled, { css, keyframes } from "styled-components";
import frame from "../../icon/Frame.png";

export const MapStyles = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  border-radius: 10px;
`;

export const MapContainer = styled.div`
  position: relative;
  justify-content: center;
  overflow-y: hidden;
`;
export const Overlay = styled.div`
  border-radius: 5px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f95001;
  color: white;
  cursor: pointer;
`;

export const Arrow = styled.div`
  width: 20px;
  height: 10px;
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
`;

export const PlaceName = styled.p`
  font-size: 16px;
  padding: 10px 5px 10px 10px;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;
export const DetailLink = styled.a`
  text-align: center;

  // 오버레이 링크 이미지
  img {
    width: 20px;
    height: 20px;
    color: white;
  }
`;
export const SearchBtns = styled.div`
  position: absolute;
  top: 30px;
  right: 40px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const KeywordBtn = styled.button`
  width: 120px;
  color: #f95001;
  font-weight: bold;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 5px;
  font-size: 0.85rem;
  padding: 10px;
  cursor: pointer;

  ${(props) =>
    props.selected &&
    `
    background-color: #f95001;
    color:white;
  `}
  /* &:active {
    border: 2px solid #f95001;
  } */
  @media (max-width: 768px) {
    width: 100px;
    padding: 8px;
    font-size: 0.75rem;
  }
`;
// 맵컨테이너
export const ListContainer = styled.div`
  position: absolute;
  left: 0px;
  top: 0;
  bottom: 0;
  cursor: pointer;
  z-index: 20;
  display: flex;
  width: 300px;
  ${({ isClosed }) =>
    isClosed &&
    css`
      left: -270px;
    `};

  @media (max-width: 768px) {
    width: 100%; /* 모바일 화면에서는 가득 차도록 설정 */
  }
`;

export const SideBarOpenBtn = styled.button`
  display: block;
  border: none;
  margin: auto 0;
  width: 30px;
  height: 90px;
  border-radius: 0 10px 10px 0;
  background: #333333;
  transition: 0.3s;
  cursor: pointer;
  z-index: 30;
`;
// 리스트 창
export const ModalContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.7);
  overflow-y: auto;
  transition: 0.3s;
  flex-grow: 1;
  @media (max-width: 768px) {
    height: ${({ isClosed }) => (isClosed ? "0px" : "300px")};
  }
`;

export const List = styled.ul``;

export const Item = styled.li`
  position: relative;
  border-bottom: 1px solid #f95001;
  padding: 20px;
  width: 100%;
  background-color: ${({ selected }) =>
    selected ? " rgba(249,80,1, 0.3)" : "rgba(255, 255, 255, 0.7)"};
`;

export const Name = styled.p`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: #f95001;
`;

export const Category = styled.p`
  color: #898989;
  font-size: 0.85rem;
  margin-bottom: 5px;
`;

export const Address = styled.p`
  font-size: 0.85rem;
  margin-bottom: 5px;
  color: #898989;
`;

export const Distance = styled.p`
  margin-right: 5px;
  color: #898989;
`;

export const RoadAddress = styled.div`
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  color: #898989;
  img {
    width: 30px;
  }
`;
export const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
  font-size: 0.85rem;
`;

export const Division = styled.p`
  margin-right: 5px;
  color: #f95001;
  font-size: 0.85rem;
`;

export const PhoneNumber = styled.p`
  color: #898989;
  font-size: 0.85rem;
`;

export const NoList = styled.p`
  background-color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
  padding: 10px;
`;

export const Pages = styled.div`
  position: sticky;
  background-color: rgba(255, 255, 255, 0.7);
  bottom: 0px;
  text-align: center;
  padding: 10px 0;
  font-size: 1rem;
`;

export const PageBtn = styled.button`
  margin: 0 10px;
  border: none;
  color: ${({ selected }) => (selected ? "#f95001" : "#333333")};
  background-color: rgba(255, 255, 255, 0.7);
`;

const slide = keyframes`
  from {
    opacity: 0;
    transform: translateY(100%);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;
// list커ㄴ테이너 랑 같은고
export const MapModal = styled.div`
  position: absolute;
  z-index: 20;
  left: 0;
  right: 0;
  bottom: 0;
  animation: ${slide} 0.2s ease-in-out;
`;

export const ModalBtn = styled.button`
  display: block;
  margin: 15px auto 10px;
  width: 70px;
  height: 32px;
  border: none;
  cursor: pointer;
  background-color: rgba(249, 80, 1, 0.9);
  border-radius: 10px;
  img {
  }
  ${({ isClosed }) =>
    isClosed &&
    css`
      left: 0px;
    `}
`;

// 현재 내 위치로 돌아가는 버튼
export const GoBackButton = styled.button`
  position: absolute;
  bottom: 20px;
  right: 20px;
  z-index: 10;
  width: 55px;
  height: 55px;
  background: no-repeat #333333 url(${frame}) center/contain;
  background-size: 90%;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  &:active {
    background: no-repeat #f95001 url(${frame}) center/contain;
  }
  @media (max-width: 768px) {
    width: 45px;
    height: 45px;
    right: 10px;
    bottom: 40px;
  }

  // Modal이 열릴 때만 아래 추가 스타일을 적용
  ${({ isModalOpen }) =>
    isModalOpen &&
    css`
      @media (max-width: 768px) {
        bottom: 340px;
        transition: 0.2s;
      }
    `}
`;
// 접속위치 텍스트
export const GoBackTxt = styled.span`
  position: absolute;
  bottom: 30px;
  right: 80px;
  z-index: 10;
  width: 90px;
  height: 30px;
  line-height: 30px;
  border-radius: 20px;
  text-align: center;
  color: #333333;
  margin-top: 10px;

  @media (max-width: 768px) {
    font-size: 12px;
    width: 70px;
    height: 25px;
    line-height: 25px;
    right: 60px;
    bottom: 50px;
  }

  // Modal이 열릴 때만 아래 추가 스타일을 적용
  ${({ isModalOpen }) =>
    isModalOpen &&
    css`
      @media (max-width: 768px) {
        bottom: 350px;
      }
    `}
`;
// 현 지도에서 검색 버튼
export const ReSearch = styled.button`
  position: absolute;
  color: #333333;
  font-size: 14px;
  bottom: 80px;
  transform: translateX(-50%);
  left: 50%;
  z-index: 10;
  width: 160px;
  height: 40px;
  line-height: 40px;
  border-radius: 30px;
  border: none;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
    rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
  cursor: pointer;
  &:active {
    color: white;
    background-color: #333333;
  }

  @media (max-width: 768px) {
    font-size: 12px;
    bottom: 80px;
    width: 130px;
    height: 30px;
    line-height: 30px;
  }

  // Modal이 열릴 때만 아래 추가 스타일을 적용
  ${({ isModalOpen }) =>
    isModalOpen &&
    css`
      @media (max-width: 768px) {
        bottom: 350px;
        transition: 0.2s;
      }
    `}
`;
