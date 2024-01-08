import React, { useContext, useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';
import dayjs from 'dayjs';
import AxiosApi from '../../api/Axios';
import { PayContext } from '../../context/Paystore';
const Container =styled.div`
  width: 55%;
  height: 700px;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: start;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledCalendar = styled(Calendar)`
  /* 전체 스타일 */
  border-radius: 5px;
  width: 100%;
  background-color: #ffffff;
  box-shadow: 1px 1px 2px #333333;
  align-items: center;
  padding-bottom: 30px ;
    /* 글자 스타일 */
  .react-calendar__month-view__days__day-names,
  .react-calendar__month-view__days__day {
    font-family: 'Arial', sans-serif;
    font-size: 13px;
    color: #333333;
    border: none;
 
  }
  
  .react-calendar__tile--active:hover {
    background-color: #cce5ff; /* 선택된 날짜 호버 시 배경색 변경 */
    cursor: pointer;
  }

  .react-calendar__tile:hover {
    background-color: #f3eeea; /* 호버 시 배경색 변경 */
    
    cursor: pointer;
  }
  /* 요일 스타일 */
  .react-calendar__month-view__weekdays__weekday abbr {
    font-family: 'Arial', sans-serif;
    font-size: 14px;
    color: #555555;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .react-calendar__month-view__weekdays__weekday{
    scale: 0.99;
  }
  /* 년월 스타일 */
  .react-calendar__navigation {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    background-color: #333333;
    border: 1px solid black;
    border-radius: 5px 5px 0 0;
    box-shadow: 0 1px 1px #333333;
    border: none;
  }
  /* 년월 스타일 */
  .react-calendar__navigation__label {
    font-family: 'Arial', sans-serif;
    font-size: 15px;
    color: #eeeeee;
    margin: 0 10px;
    font-weight: bold;
    pointer-events: none;
  }

  .react-calendar__navigation__arrow.react-calendar__navigation__prev-button,
  .react-calendar__navigation__arrow.react-calendar__navigation__prev2-button,
  .react-calendar__navigation__arrow.react-calendar__navigation__next-button,
  .react-calendar__navigation__arrow.react-calendar__navigation__next2-button{
    font-size: 25px;
    color: #eeeeee;
    cursor: pointer;
    &:hover{
      background-color: #333333;
      color:#F95001;
    }
    &:focus{
      background-color: #333333;
      color:#F95001;
    }
  }

  .react-calendar__month-view__days {
    margin:5px 0; /* 위쪽 간격 조정 */ /* 아래쪽 간격 조정 */
  }
  .react-calendar__tile {
    height: 75px;
    font-size: 0.8em;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    justify-content: start;
    scale: 0.99;
    box-shadow: 0 0 2px #33333380;
  }
  .react-calendar__tile--active {
    border-bottom:5px solid #264fe5;
    background-color:#f3eeea; /* 선택된 날짜 배경색 */
  }
  
.react-calendar__tile--active:active,
.react-calendar__tile:focus,
  .react-calendar__tile:hover {
    background-color: #f3eeea;
  }
  .react-calendar__tile--now:active,
.react-calendar__tile--now:hover {
  /* 오늘 날짜에 대한 호버 및 액티브 스타일 */
  background-color: #f89f7679;
  
}
.react-calendar__tile--now {
  background-color: #f89f7679;
  border-bottom: 5px solid #F95001;
  /* 오늘 날짜에 대한 스타일 */
}
.react-calendar__tile.saturday {
  color:#6560ff;
}

.react-calendar__tile.sunday {
  color:#ff8349;
}

`;

const Story =styled.div`
display: flex;
flex-direction: column;
width: 100%;
  .story1{
    white-space : nowrap ;
    overflow : hidden;
    text-overflow: ellipsis;
    font-size: 0.9em;
    background-color: #ffb0b0;
    border-radius: 3px;
    color:black;
  }
  .story2{
    display: flex;
    justify-content: center;
    width: 100%;
    font-size: 0.9em;
    background-color: #97f095;
    border-radius: 3px;
    color:blue;
  }
      @media (max-width: 1280px) {
    font-size: 0.6em;
  }
    @media (max-width: 768px) {
    font-size: 0.7em;
  }
  
`;


const MyCalender = (props) =>{
  const {modalOpen} =props;
  const [date, setDate] = useState(new Date());
  const [diaryData,setDiaryData]  =useState();
  const [questData,setQuestData] =useState();
  const context = useContext(PayContext);
  const {isTrue}=context;

  const selectedDate =(date) =>{
    const nextDay = new Date(date); // date를 변경하지 않고 새로운 객체를 생성합니다.
    nextDay.setDate(nextDay.getDate() + 1); // 다음 날짜로 설정합니다.
    return nextDay.toISOString().split('T')[0]; // ISO 형식의 날짜를 반환합니다.
  }

  const onChange = (seldate) => {
    props.onSelected(seldate);
    setDate(seldate);
  };

  const tileDisabled=({ date })=>{
    const currentDate = new Date();
    // 일주일 후의 날짜를 구합니다.
    const oneWeekLater = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 7);
    // 일주일 후부터의 날짜를 비활성화 처리합니다.
    return date >= oneWeekLater;
  }
  
  const tileClassName=({ date, view })=>{
    // 일요일(0) 또는 토요일(6)인지 확인하여 클래스를 지정합니다.
    if (date.getDay() === 0 /* 일요일 */) {
      return 'sunday'; // 일요일에 해당하는 클래스
    }
    if (date.getDay() === 6 /* 토요일 */) {
      return 'saturday'; // 토요일에 해당하는 클래스
    }
    return ''; // 다른 날짜는 추가 클래스가 없습니다.
  }

    // 선택된 날짜를 YYYY-MM-DD 형식으로 변환
    useEffect(() => {
      const CalenderData = async () => {
        try{
          const res = await AxiosApi.CalenderQuest();
          if (res.status === 200){
            console.log(res.data)
            setDiaryData(res.data)
            }else{
              alert("왜안되니2222")
            }}catch(e){
              console.warn(e);
            }
        try{
          const res1 = await AxiosApi.CalenderDiary();
          if (res1.status === 200){
              console.log(res1.data)
              setQuestData(res1.data)
              }else{
                alert("왜안되니11111111")
              }}catch(e){
                console.warn(e);
            }
      }
      CalenderData();
    }, [date,isTrue]);


  const tileContent = ({ date }) => {  
    const formattedDate =selectedDate(date); // 날짜를 원하는 형식으로 포맷팅하는 함수
    const diaryDatas = diaryData ? (diaryData[formattedDate] || "") : "";
    const questDatas = questData ? (questData[formattedDate] || "") : "";

    return (
      <Story>
      <div className='story1'>
        {diaryDatas ? diaryDatas : ''}
      </div>
      <div className='story2'>
      {questDatas ? `미션 :${questDatas}%` : ''}
      </div>
      </Story>
    );
  };

  const ClickDate =()=>{
    props.setClick(true);
  }

  return (
    <Container>
        <StyledCalendar tileClassName={tileClassName} tileDisabled={tileDisabled} onClickDay={ClickDate} onChange={onChange} value={date} tileContent={tileContent} formatDay={(locale, date) => dayjs(date).format('DD')}/> 
    </Container>
  );
  };
  
  export default MyCalender;