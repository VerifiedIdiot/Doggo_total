import styled, { css } from "styled-components";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from "../../utill/Modal";
import PopupDom from "../member/PopupDom";
import PopupPostCode from "../member/PopupPostCode";
import { PayContext } from "../../context/Paystore";
import AxiosApi from "../../api/Axios";

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  height: 50px;
  margin-top: 50px;
  h1 {
    font-size: 1.6em;
    font-weight: bold;
  }
  h2 {
    display: flex;
    align-items: center;
    padding: 20px 0;
    font-size: 1.4em;
    font-weight: bold;
  }
  h3 {
    font-size: 1em;
    font-weight: 500;
    padding-left: 20px;
  }
  .title1box1 {
    width: 100%;
    height: 100px;
    font-size: 0.8em;
    padding-left: 1%;
    line-height: 1.5em;
    align-items: center;
    font-weight: bold;
    li {
      line-height: 2em;
      list-style: square;
    }
  }
`;

const SellTable = styled.table`
  width: 100%;
  tr {
    display: flex;
    flex-direction: row;
  }

  th {
    display: flex;
    justify-content: center;
    width: 20%;
    align-items: center;
    justify-content: start;
    padding-left: 2%;
    height: 50px;
    border-bottom: 1px solid #dfdfdf;
    font-size: 14px;
    font-weight: bold;
  }
  td {
    display: flex;
    width: 81%;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    padding-left: 2%;
    height: 50px;
    border-bottom: 1px solid #dfdfdf;
    font-size: 12px;
    font-weight: bold;
  }
  .selected {
    height: 80%;
    width: 30%;
  }
  @media (max-width: 768px) {
    th {
      font-size: 12px;
    }
  }
`;

const PostBox = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  .inputBox {
    width: 50%;
  }
  .inputBox1 {
    width: 100%;
  }
`;

const Quicksell3 = (props) => {
  const { feedName, title } = props;
  const [postDetail, setPostDetail] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [postNum, setPostNum] = useState("");
  const [userInfo, setUserInfo] = useState([]);
  const [post, setPost] = useState("");
  const [dayNum, setDayNum] = useState();
  const [price, setPrice] = useState();
  const context = useContext(PayContext);
  const {
    setFeedName,
    setSalesAddr,
    setSalesAutoDelivery,
    setSalesDelivery,
    setSalesPrice,
    setTitle,
  } = context;

  useEffect(() => {
    if (title === "ONE MONTH FREE") {
      setPrice("/");
    }
    if (title === "STANDARD") {
      setPrice(99000);
      props.onPrice(99000);
      setSalesPrice(99000);
    }
    if (title === "PREMIUM") {
      setPrice(129000);
      props.onPrice(129000);
      setSalesPrice(129000);
    }
    setFeedName(feedName);
    setTitle(title);
    setSalesAddr(post + postDetail + postNum);
    setSalesAutoDelivery(dayNum);
    setSalesDelivery(deliveryDate1);
    const getMember = async () => {
      try {
        const response = await AxiosApi.memberGet();
        console.log("detail.email:", response.data);
        setUserInfo(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMember();
  }, [postNum, post, dayNum, postDetail]);

  const openPostCode = () => {
    setIsPopupOpen(true);
  };
  const closePostCode = () => {
    setIsPopupOpen(false);
  };
  const onPost = (post) => {
    setPost(post);
  };
  const onPostNum = (num) => {
    setPostNum(num);
  };
  const date11 = new Date(),
    oderDate1 =
      date11.getFullYear() +
      "년" +
      (date11.getMonth() + 1) +
      "월" +
      date11.getDate() +
      "일";

  const deliveryDate = new Date();
  let year = deliveryDate.getFullYear();
  let month = deliveryDate.getMonth() + 2;
  if (month > 12) {
    year += Math.floor(month / 12); // 연도 계산
    month = month % 12; // 12로 나눈 나머지가 새로운 월
  }
  const deliveryDate1 =
    year +
    "-" +
    String(month).padStart(2, "0") +
    "-" +
    String(dayNum).padStart(2, "0");

  const ChangePay = (price) => {
    return Intl.NumberFormat("en-US").format(price);
  };

  const [modalOpen, setModalOpen] = useState(false);
  const closeModal = () => {
    setModalOpen(false);
  };

  const dateArray = Array.from(
    { length: 5 },
    (_, index) => (index + 1) * 5
  ).filter((number) => number % 5 === 0);

  return (
    <>
      <TitleBox>
        <h1>구독 정보</h1>
      </TitleBox>
      <SellTable>
        <tr>
          <th>상품명 </th>
          <td> {title} 구독 서비스</td>
        </tr>
        <tr>
          <th>사료 이름</th>
          <td> {feedName} </td>
        </tr>

        <tr>
          <th>구독 시작일</th>
          <td>{oderDate1}</td>
        </tr>

        <tr>
          <th>이름 / 연락처</th>
          <td>
            {" "}
            {userInfo.memberName} / {userInfo.memberTel}
          </td>
        </tr>

        <tr>
          <th>배송지 </th>
          <td>
            <PostBox>
              <div>
                <input
                  className="inputBox1"
                  type="input"
                  placeholder="주소"
                  value={post}
                  onClick={openPostCode}
                />
                <div>
                  <input
                    className="inputBox"
                    type="input"
                    placeholder="우편번호"
                    value={postNum}
                  />
                  <input
                    className="inputBox"
                    type="input"
                    placeholder="상세주소 입력"
                    value={postDetail}
                    onChange={(e) => setPostDetail(e.target.value)}
                  />
                </div>
              </div>
            </PostBox>
            <div id="popupDom">
              {isPopupOpen && (
                <PopupDom>
                  <PopupPostCode
                    onPostNum={onPostNum}
                    onPost={onPost}
                    onClose={closePostCode}
                  />
                </PopupDom>
              )}
            </div>
          </td>
        </tr>
        <tr>
          <th>정기 배송 일자</th>
          <td>
            <select
              className="selected"
              onChange={(e) => setDayNum(e.target.value)}
              value={dayNum}
              name="선택상자"
            >
              <option value="">정기 배송 일자</option>
              {dateArray.map((day) => (
                <option key={day} value={day}>
                  {day}일
                </option>
              ))}
            </select>{" "}
          </td>
        </tr>
        <tr>
          <th>정기결제 금액</th>
          <td> {ChangePay(price)}원 (기본상품가: 원,제세공과금 0원)</td>
        </tr>
        <tr>
          <th>최종결제 금액</th>
          <td> {ChangePay(price)}원 (기본상품가: 원,제세공과금 0원)</td>
        </tr>
      </SellTable>
      <TitleBox style={{ height: "220px", marginTop: "0" }}>
        <h2>취소위약금 및 동의사항</h2>
        <ul className="title1box1">
          <li>
            결제완료 후 예약확정 시 취소 시점에 따라 위약금이 발생할 수
            있습니다.
          </li>
          <li>취소료 규정은 각 상품 상세 페이지에서 확인 가능합니다.</li>
          <li>
            예약이 완료되면 담당자가 전화로 추가 안내k 및 확인 절차를 거칩니다.
          </li>
          <li>
            상품의 특성 상 경우에 따라 예약이 완료된 후에도 처리가 불가능할 수
            있습니다.
          </li>
          <li>
            본 상품의 세부 약관 규정은 재경부 고시 소비자 피해보상 규정을
            바탕으로 합니다.
          </li>
        </ul>
      </TitleBox>

      <Modal open={modalOpen} close={closeModal} header="정보">
        약관 동의후 결제 바랍니다.
      </Modal>
    </>
  );
};

export default Quicksell3;
