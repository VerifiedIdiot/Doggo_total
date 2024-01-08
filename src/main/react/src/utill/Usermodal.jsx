import React, { useState } from "react";
import styled from "styled-components";
import AxiosApi from "../api/Axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import { subDays, subYears } from "date-fns";
import upArrowImage from "../img/up-arrow.png";
import downArrowImage from "../img/down-arrow.png";
import PopupDom from "../components/member/PopupDom";
import PopupPostCode from "../components/member/PopupPostCode";

const ModalStyle = styled.div`
  .modal {
    display: none; // 숨겨진 상태로 시작
    position: fixed; // 스크롤해도 동일한 위치
    top: 0; // 화면 전체를 덮도록 위치
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99; // 다른 모달 보다 위에 위치하도록 함
    background-color: rgba(0, 0, 0, 0.6); // 배경색을 검정으로 하고 투명도 조절
  }
  .openModal {
    display: flex; // 모달이 보이도록 함
    align-items: center;
    /* 팝업이 열릴때 스르륵 열리는 효과 */
    animation: modal-bg-show 0.8s;
  }
  button {
    outline: none;
    cursor: pointer;
    margin-right: 10px;
    border: 0;
  }
  section {
    width: 90%;
    max-width: 450px;
    margin: 0 auto;
    border-radius: 0.3rem;
    background-color: #fff;
    /* 팝업이 열릴때 스르륵 열리는 효과 */
    animation: modal-show 0.3s;
    overflow: hidden;
  }
  section > header {
    position: relative;
    padding: 16px 64px 16px 16px;
    background-color: #333333;
    color: white;
    font-weight: 700;
  }

  section > header button {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 30px;
    font-size: 21px;
    font-weight: 700;
    text-align: center;
    color: white;
    background-color: transparent;
  }
  section > main {
    padding: 16px;
    border-bottom: 1px solid #dee2e6;
    border-top: 1px solid #dee2e6;
  }
  section > footer {
    padding: 12px 16px;
    text-align: right;
  }
  section > footer button {
    padding: 6px 12px;
    color: #fff;
    background-color: #333333;
    border-radius: 5px;
    font-size: 13px;
  }
  section > footer button:active {
    background-color: #686868;
    // 다른 스타일도 필요하다면 추가
  }
  @keyframes modal-show {
    from {
      opacity: 0;
      margin-top: -50px;
    }
    to {
      opacity: 1;
      margin-top: 0;
    }
  }
  @keyframes modal-bg-show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Change1 = styled.div`
  display: flex;

  .react-datepicker__navigation--years-upcoming {
    top: 0%;
    background-image: url(${upArrowImage});
    background-size: contain; /* 이미지 크기 설정 */
    background-repeat: no-repeat; /* 이미지 반복 설정 */
    background-position: center; /* 이미지를 가운데 정렬 */
    background-size: 70%;
    cursor: pointer;
  }

  .react-datepicker__navigation--years-previous {
    top: 0%;
    background-image: url(${downArrowImage});
    background-size: contain; /* 이미지 크기 설정 */
    background-repeat: no-repeat; /* 이미지 반복 설정 */
    background-position: center; /* 이미지를 가운데 정렬 */
    cursor: pointer;
    background-size: 70%;
  }

  .Calender {
        width: 300px;
        margin-left: 20px;

        @media (max-width: 768px) {
              width: 250px;
            }
      }

      .Post {
        width: 110px;
        margin-left: 5px;

        @media (max-width: 768px) {
              width: 80px;
            }
      }
`;

const Change2 = styled.input`
  width: 300px;
  height: 25px;
  text-justify: center;
  border-radius: 8px;
  margin-left: 20px;
`;

const Exist1 = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const Exist2 = styled.div`
  width: 300px;
  height: 25px;
  text-justify: center;
`;

const Usermodal = (props) => {
  const { open, close, type, header, name, detail } = props;
  const [info, setInfo] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [isPostNum, setIsPostNum] = useState("");
  const [isPost, setIsPost] = useState("");

  const [postNum, setPostNum] = useState("");
  const [post, setPost] = useState("");
  const [postDetail, setPostDetail] = useState("");
  const [datePlus, setDatePlus] = useState("");

  const onChangeInfo = (date) => {
    if (type === 1) {
      // 생년월일 변경의 경우
      const updatedDate = new Date(date);
      setDatePlus(updatedDate);
      // updatedDate.setDate(updatedDate.getDate() + 1);
      console.log(type);
      setInfo(updatedDate);
    } else if (type === 2) {
      // 주소 변경의 경우
      const address = `${post} ${postDetail} ${postNum}`;
      setInfo(address); // 전체 주소를 info에 업데이트
    } else {
      // 기본적으로는 일반 input 사용
      setInfo(date);
    }
  };

  const Close = () => {
    setInfo("");
    close();
    setDatePlus("");
    setPost("");
    setPostNum("");
    setPostDetail("");
  };

  const openPostCode = () => {
    setIsPopupOpen(true);
  };

  // 팝업창 닫기
  const closePostCode = () => {
    setIsPopupOpen(false);
  };

  const handleUpdate = async () => {
    try {
      let updatedInfo = null;
      if (type === 1) {
        // 생년월일 변경의 경우
        const updatedDate = new Date(datePlus);
        updatedDate.setDate(updatedDate.getDate() + 1);
        updatedInfo = updatedDate;
      } else if (type === 2) {
        // 주소 변경의 경우
        const address = `${post} ${postDetail} ${postNum}`;
        console.log("주소 변경" + type + address);
        updatedInfo = address;
      } else {
        // 기본적으로는 일반 input 사용
        updatedInfo = info;
      }

      if (
              updatedInfo !== null &&
              updatedInfo !== undefined &&
              updatedInfo !== ""
            ) {
      await AxiosApi.memberUpdate(updatedInfo, type);
      alert("회원 정보가 성공적으로 수정되었습니다.");
      console.log("이게뭐야" + updatedInfo);
      close();
      setInfo("");
      setDatePlus("");
      setPost("");
      setPostNum("");
      setPostDetail("");
      } else {
              alert("수정할 정보가 없습니다.");
              console.warn(updatedInfo);
            }
    } catch (error) {
      console.error(error);
      alert("회원 정보 수정에 실패했습니다.");
      close();
      setInfo("");
      setDatePlus("");
      setPost("");
      setPostNum("");
      setPostDetail("");
    }
  };

  const onPostNum = (num) => {
    setPostNum(num);
    setIsPostNum(num !== "" && num !== undefined);
  };

  const onPost = (post) => {
    setPost(post);
    setInfo(post);
    setIsPost(post !== "" && post !== undefined);
  };

  const maxSelectableDate = subDays(new Date(), 1);

  // &times; 는 X표 문자를 의미
  return (
    <ModalStyle>
      <div className={open ? "openModal modal" : "modal"}>
        {open && (
          <section>
            <header>{header}</header>
            <main
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Exist1>
                <div className="Title">현재 {name} : </div>
                <Exist2>{detail}</Exist2>
              </Exist1>
              <Change1>
                <div className="Title">수정 {name} : </div>
                {type === 1 ? (
                  // 생년월일 변경의 경우 달력 등의 입력 방식
                  <DatePicker
                    placeholderText="생년월일"
                    className="Calender"
                    selected={datePlus}
                    locale={ko}
                    shouldCloseOnSelect
                    onChange={(date) => onChangeInfo(date)}
                    showYearDropdown
                    showMonthDropdown
                    dateFormat="yyyy년 MM월 dd일"
                    maxDate={maxSelectableDate}
                  />
                ) : type === 2 ? (
                  // 주소 변경의 경우 주소 검색 모달 등의 입력 방식
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
                    <input
                      value={post}
                      readOnly
                      onClick={() => {
                        openPostCode();
                      }}
                      className="Post"
                      placeholder="주소"
                    />
                    <input value={postNum} readOnly className="Post" placeholder="우편번호"/>
                    <input
                      value={postDetail}
                      onChange={(e) => {
                        setPostDetail(e.target.value);
                        // 주소 정보가 변경될 때 onChangeInfo 호출
                      }}
                      placeholder="상세 주소"
                      className="Post"
                    />
                  </div>
                ) : (
                  // 기본적으로는 일반 input 사용
                  <Change2
                                                        value={info}
                                                        onInput={(e) => {
                                                          // 입력값이 숫자인지 확인 후 숫자만 유효한 값으로 설정
                                                          const inputValue = e.target.value;
                                                          if (/^\d*$/.test(inputValue)) {
                                                            setInfo(inputValue);
                                                          }
                                                        }}
                                                      />
                )}
              </Change1>
            </main>
            <footer>
              {type && <button onClick={() => handleUpdate(info)}>수정</button>}
              <button onClick={Close}>취소</button>
            </footer>
          </section>
        )}
      </div>
    </ModalStyle>
  );
};

export default Usermodal;
