import MyCalender from "../../components/diypage/Calender";
import styled from "styled-components";
import Eventbox from "../../components/diypage/Eventbox";
import { useState } from "react";

const Btween = styled.div`
  display: flex;
  flex-direction: row;
  min-width: 900px;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 768px) {
    flex-direction: column;
    min-width: 0;
  }
`;


const Diymain = () => {
  const [openModal,setOpenModal] =useState();
  const newDate = () => {
    const nextDay = new Date(); // date를 변경하지 않고 새로운 객체를 생성합니다.
    nextDay.setDate(nextDay.getDate()); // 다음 날짜로 설정합니다.
    return nextDay.toISOString().split("T")[0];
  };
  const [day, setDay] = useState(newDate());

  const onSelect = (sel) => {
    setDay(selectedDate(sel));
  };



  const selectedDate = (date) => {
    const nextDay = new Date(date); // date를 변경하지 않고 새로운 객체를 생성합니다.
    nextDay.setDate(nextDay.getDate() + 1); // 다음 날짜로 설정합니다.
    return nextDay.toISOString().split("T")[0]; // ISO 형식의 날짜를 반환합니다.
  };

  const setClick=(sel)=>{
    setOpenModal(sel);
  }

  return (
    <>
      <Btween>
        <MyCalender onSelected={onSelect} setClick={setClick}/>
        <Eventbox day={day} openModal={openModal}/>
      </Btween>
    </>
  );
};

export default Diymain;
