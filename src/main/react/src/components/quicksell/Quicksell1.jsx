import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AxiosApi from "../../api/Axios";
import { PayContext } from "../../context/Paystore";

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px;
  h1 {
    font-size: 2.5em;
    font-weight: bold;
    padding: 20px;
  }
  h3 {
    padding: 15px;
    font-size: 1em;
    font-weight: bold;
    color: #776B5D;
  }
`;

const ItemBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  width: 70%;
  height: 200px;
  border: 2px solid #dfdfdf;
  border-radius: 10px;
  cursor: pointer;
  .itemInfo {
    width: 100%;
    height: 150px;
    margin-left: 5%;
  }
  h1 {
    font-size: 2em;
    font-weight: bold;
    display: flex; 
    width: 80%;
    justify-content: center; 
    align-items: center;
  }
  h2 {
    display: flex;
    flex-direction: column-reverse;
    height: 80px;
    font-size: 24px;
    font-weight: bold;
  }
    h3{
    font-size: 1em;
    color: grey;
    line-height: 1.3em;
  }
  @media (max-width: 768px) {
    width: 90%;
    }
`;

const ItemImg = styled.img`
  width: 200px;
  height: 180px;
  border-radius: 10px 0 0 10px;
  object-fit: cover;
`;

const Quicksell1 = (props) => {
  const {feedId} = props;
  const[feedDetail,setFeedDetail]=useState([]);
  const context = useContext(PayContext);
  const {setFeedName}=context;

  useEffect(() => {
    const FeedInfo = async () => {
      try {
        console.log(feedId);
        const resp = await AxiosApi.FeedInfo(feedId); //전체 조회
        if (resp.status === 200){
            setFeedDetail(resp.data);
            console.log(resp.data);
            props.onSelect(resp.data.feedName);
            setFeedName(resp.data.feedName);
        }}catch (e) {
        console.log(e);
      }
    };
    FeedInfo();
  },[]);

  const ChangePay = (price)=>{
    return Intl.NumberFormat('en-US').format(price);
  }

  return (
    <>
      <TitleBox>
        <h1>정기구독 하기</h1>
        <h3>구독하여 친구가 되어 드리겠습니다. *^^*</h3>
      </TitleBox>
      <ItemBox >
        <ItemImg
          src= {feedDetail.feedImg}
          alt="먹이 사진"
        />
        <div className="itemInfo">
          <h1>{feedDetail.feedName}</h1>
          <br />
          <h3>금액대 : {ChangePay(feedDetail.feedPrice)} </h3>
          <h3>정보 : {feedDetail.feedInfo}</h3>
        </div>
      </ItemBox>
    </>
  );
};

export default Quicksell1;
