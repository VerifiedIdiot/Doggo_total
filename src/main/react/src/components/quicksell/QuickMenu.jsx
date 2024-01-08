import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AxiosApi from "../../api/Axios";
import Feedinfomodal from "../../utill/Feedinfomodal";

const SellBox = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
  .box1 {
    display: flex;
    height: 480px;
    width: 340px;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    background-color: #333333;
    flex-direction: column;
    box-shadow: 0 0 8px black;
    @media (max-width: 1280px) {
      height: 400px;
      width: 280px;
    }
    @media (max-width: 768px) {
      height: 70vh;
      width: 400px;
      min-height: 430px;
      margin-top: 20px;
    }
  }
  .box2 {
    display: flex;
    height: 70%;
    width: 90%;
    background-color: white;
    border-radius: 5px;
    align-items: center;
    flex-direction: column;
    h1 {
      font-size: 1.8em;
      font-weight: bold;
      color: #000000;
      padding: 20px;
    }
    ol {
      font-size: 1.3em;
      list-style: circle;
      line-height: 40px;
      color: #000000;
    }
    .selectBox {
      display: flex;
      justify-content: center;
      align-items: center;
      border: none;
      width: 63%;
      height: 40px;
      border-radius: 5px;
      font-size: 15px;
      background-color: #333333;
      color: white;
    }
    @media (max-width: 1280px) {
      h1 {
        font-size: 1.3em;
      }
      ol {
        line-height: 28px;
        font-size: 1em;
      }
    }
    @media (max-width: 768px) {
      h1 {
        font-size: 2em;
      }
      ol {
        line-height: 35px;
        font-size: 1.4em;
      }
    }
  }
  .box3 {
    display: flex;
    height: 20%;
    width: 100%;
    background-color: #f95001;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    cursor: pointer;
    h1 {
      font-size: 2em;
      color: white;
      padding: 10px;
    }
    p {
      font-size: 1.5em;
      color: white;
    }

    @media (max-width: 1280px) {
      h1 {
        font-size: 1.6em;
      }
      p {
        font-size: 1.2em;
      }
      @media (max-width: 768px) {
        h1 {
          font-size: 2.4em;
        }
        p {
          font-size: 1.2em;
        }
      }
    }
  }
  .feedinfoBox {
    text-decoration: underline;
    cursor: pointer;
    &:hover {
      color: #f95001;
      font-weight: bold;
    }
  }
`;

const PatDogBtn = styled.button`
  width: 80px;
  height: 30px;
  margin: 4px;
  background-color: ${(props) => (props.clicks ? "#878787" : "#ff5f0e")};
  color: ${(props) => (!props.clicks ? "white" : "black")};
  border-radius: 5px;
  border: none;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: #ff5f0e;
  }
  @media (max-width: 768px) {
    font-size: 1em;
    width: 100px;
    height: 35px;
  }
`;

const QuickMenu = (props) => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState();
  const [dogBtn, setDogBtn] = useState(false);
  const [catBtn, setCatBtn] = useState(false);
  const [feedId, setFeedId] = useState();
  const [isTrue, setIsTrue] = useState(true);
  const {
    title,
    list1,
    list2,
    list3,
    list4,
    title2,
    dataList,
    minPrice,
    maxPrice,
  } = props;

  const handleSelect = (e) => {
    setSelected(e.target.value);
    setFeedId(e.target.value);
  };

  const dogClick = () => {
    props.onSelected("DOG");
    setSelected();
    setFeedId();
    setDogBtn(true);
    setCatBtn(false);
    setIsTrue(false);
  };

  const catClick = () => {
    props.onSelected("CAT");
    setSelected();
    setFeedId();
    setDogBtn(false);
    setCatBtn(true);
    setIsTrue(false);
  };

  const payClick = () => {
    if (feedId !== undefined && feedId !== "") {
      if (title === "ONE MONTH FREE") {
        changeService();
      } else {
        navigate(`/quick/sell/${feedId}/${title}`);
      }
    } else {
      alert("옵션을 선택해주세요!");
    }
  };

  const changeService = async () => {
    try {
      const res = await AxiosApi.memberGet();
      console.log(res.data);
      if (res.data.memberGrade === null) {
        await AxiosApi.memberUpdate("ONE MONTH FREE", 5);
        alert("무료구독 서비스 시작되었습니다.");
        navigate("/");
      } else {
        alert("이미 가입하신 서비스가 있습니다.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openModalClick = async () => {
    if (feedId !== "" && feedId !== undefined) {
      try {
        console.log(feedId);
        const resp = await AxiosApi.FeedInfo(feedId); //전체 조회
        if (resp.status === 200) {
          props.setFeedDetail(resp.data);
          console.log(resp.data);
        }
      } catch (e) {
        console.log(e);
      }
      props.setOpenModal(true);
    } else {
      alert("옵션을 선택해주세요!");
    }
  };

  return (
    <>
      <SellBox>
        <div className="box1">
          <div className="box2">
            <h1>{title}</h1>
            <ol>
              <li>{list1}</li>
              <li>{list2}</li>
              <li style={{ color: "red" }}>{list3}</li>
              <li>{list4}</li>
            </ol>
            <span>
              <PatDogBtn onClick={dogClick} clicks={!dogBtn}>
                강아지
              </PatDogBtn>
              <PatDogBtn onClick={catClick} clicks={!catBtn}>
                고양이
              </PatDogBtn>
            </span>
            <select
              onChange={handleSelect}
              value={selected}
              className="selectBox"
              name="선택상자"
              disabled={isTrue}
            >
              <option className="selected" value="">
                옵션 선택
              </option>
              {dataList &&
                dataList.map((data, index) => {
                  if (
                    data.feedPrice >= minPrice &&
                    data.feedPrice <= maxPrice
                  ) {
                    return (
                      <option key={index} value={data.feedId}>
                        {data.feedName}
                      </option>
                    );
                  }
                })}
            </select>
            <div className="feedinfoBox" onClick={openModalClick}>
              자세히보기
            </div>
          </div>
          <div className="box3" onClick={payClick}>
            <h1>{title2}</h1>
            <p>구독하기</p>
          </div>
        </div>
      </SellBox>

    </>
  );
};

export default QuickMenu;
