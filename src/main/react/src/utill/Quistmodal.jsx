import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AxiosApi from "../api/Axios";
import defaultDogImg from "../img/footer.png";

const ModalStyle = styled.div`
  button {
    font-weight: bold;
    background-color: #f95001;
    &:hover {
      color: #f95001;
    }
  }
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
    max-width: 650px;
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
    font-weight: 700;
    color: white;
  }

  section > header button {
    position: absolute;
    top: 10px;
    right: 0;
    width: 30px;
    font-size: 21px;
    font-weight: 700;
    text-align: center;
    color: #ffffff;
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
    &:hover {
    }
  }
  main {
    display: flex;
    height: 300px;

    .dogFootImage {
      width: 150px;
      height: 150px;
      border-radius: 5px;
    }
  }

  .proBox {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 40%;
    height: 100%;

    div {
      padding-top: 10px;
      width: 80%;
      white-space: normal;
      display: -webkit-box;
      -webkit-line-clamp: 6;
      -webkit-box-orient: vertical;
      overflow: hidden;
      p {
        font-size: 0.9em;
        font-weight: bold;
        line-height: 20px;
      }
    }
  }
  .qList {
    width: 60%;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    display: block;
    align-items: center;
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

const Card = styled.div`
  display: flex;
  width: 95%;
  height: 85px;
  box-shadow: 0px 0px 3px black;
  border-radius: 5px;
  margin: 10px auto;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  background-color: ${(props) => (props.isClick ? "#bebebe" : "white")};
  background-image: ${(props) =>
    props.isClick
      ? "url(https://blog.kakaocdn.net/dn/dYYkwf/btq8NvFwZTJ/uWyGq8YIShiQmO4PgjQehk/img.png)"
      : ""};
  background-repeat: no-repeat;
  background-size: 40%;
  background-position: center;
  h1 {
    height: 30%;
    font-size: 0.8em;
    font-weight: bold;
    color: grey;
  }
  h2 {
    line-height: 60px;
    font-size: 1.2em;
    font-weight: bold;
    color: ${(props) => (props.isClick ? "#5f5f5f" : "#F95001")};
  }
  img {
    width: 20%;
  }
`;

const DogCare = [
  {
    title1: "반려동물의 홈케어",
    title2: "양치하기",
    img: "https://firebasestorage.googleapis.com/v0/b/dogcat-42fca.appspot.com/o/careImg%2Ffree-icon-brushing-teeth-5938073.png?alt=media&token=899a7b7a-8f28-4c61-ad5d-c2d6aa890ecc",
  },
  {
    title1: "스트레스 해소, 문제행동개선",
    title2: "산책하기",
    img: "https://firebasestorage.googleapis.com/v0/b/dogcat-42fca.appspot.com/o/careImg%2Fdog-walking.png?alt=media&token=08953e1f-3c29-41bc-85f7-e88c0ec813e9",
  },
  {
    title1: "매일 반려동물과 15분교감",
    title2: "교감하기",
    img: "https://firebasestorage.googleapis.com/v0/b/dogcat-42fca.appspot.com/o/careImg%2Fanimal-care.png?alt=media&token=34adf8d5-4fab-4719-932c-205582fd453e",
  },
  {
    title1: "아프지 않게 지켜줄게",
    title2: "1분 건강체크",
    img: "https://firebasestorage.googleapis.com/v0/b/dogcat-42fca.appspot.com/o/careImg%2Ffree-icon-health-check-4773288.png?alt=media&token=7f73a21b-5cbd-4dc5-99c2-63cb1acd8e2f",
  },
  {
    title1: "털 난리에서 해방",
    title2: "빗질하기",
    img: "https://firebasestorage.googleapis.com/v0/b/dogcat-42fca.appspot.com/o/careImg%2Fhairstyle.png?alt=media&token=c473b745-ed7b-49b7-b683-472884df1e2f",
  },
];

const QuistModal = (props) => {
  const {
    open,
    confirm,
    close,
    petGender,
    petSign,
    petAge,
    petName,
    petImg,
    id,
    quest,
    day,
  } = props;
  const [click1, setClick1] = useState(false);
  const [click2, setClick2] = useState(false);
  const [click3, setClick3] = useState(false);
  const [click4, setClick4] = useState(false);
  const [click5, setClick5] = useState(false);

  useEffect(() => {
    setClick1(quest.quest1);
    setClick2(quest.quest2);
    setClick3(quest.quest3);
    setClick4(quest.quest4);
    setClick5(quest.quest5);
  }, [quest]);

  useEffect(() => {
    setClick1(false);
    setClick2(false);
    setClick3(false);
    setClick4(false);
    setClick5(false);
  }, [day]);

  const clickBtn = (index) => {
    if (index === 1) {
      setClick1((prev) => !prev);
    }
    if (index === 2) {
      setClick2((prev) => !prev);
    }
    if (index === 3) {
      setClick3((prev) => !prev);
    }
    if (index === 4) {
      setClick4((prev) => !prev);
    }
    if (index === 5) {
      setClick5((prev) => !prev);
    }
  };
  const click = (index) => {
    if (index === 1) {
      return click1;
    }
    if (index === 2) {
      return click2;
    }
    if (index === 3) {
      return click3;
    }
    if (index === 4) {
      return click4;
    }
    if (index === 5) {
      return click5;
    }
  };

  const RegClick = async () => {
    console.log(id, click1, click2, click3, click4, click5, day);
    const res = await AxiosApi.QuestReg(
      id,
      click1,
      click2,
      click3,
      click4,
      click5,
      day
    );
    if (res.data === true) {
      console.log(res.data);
      alert("저장완료!");
      close();
    } else {
      alert("실패");
    }
  };
  const handleImageLoaded = () => {
    console.log("이미지 로딩 성공!");
  };

  const handleImageError = (event) => {
    event.target.src = defaultDogImg; // 이미지 로딩이 실패하면 기본 이미지로 대체
  };

  return (
    <ModalStyle>
      <div className={open ? "openModal modal" : "modal"}>
        {open && (
          <section>
            <header>
              {petName}의 {day} 일정
              <button onClick={close}>&times;</button>
            </header>
            <main>
              <div className="proBox">
                <img
                  src={petImg}
                  onLoad={handleImageLoaded}
                  onError={handleImageError}
                  className="dogFootImage"
                />
                <div>
                  <p>이름 : {petName}</p>
                  <p>나이 : {petAge}</p>
                  <p>성별 : {petGender}</p>
                  <p>특징 : {petSign}</p>
                </div>
              </div>
              <div className="qList">
                {DogCare.map((dog, index) => (
                  <Card
                    isClick={click(index + 1)}
                    onClick={() => clickBtn(index + 1)}
                  >
                    <div>
                      <h1>{dog.title1}</h1>
                      <h2>{dog.title2}</h2>
                    </div>
                    <img src={dog.img} alt="petcareimg" />
                  </Card>
                ))}
              </div>
            </main>
            <footer>
              <button onClick={() => RegClick()}>수행완료!</button>
              <button onClick={close}>취소하기</button>
            </footer>
          </section>
        )}
      </div>
    </ModalStyle>
  );
};

export default QuistModal;
