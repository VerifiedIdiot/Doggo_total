import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CircleProgressBar from "./Circle";
import Slider from "react-slick";
import QuistModal from "../../utill/Quistmodal";
import AxiosApi from "../../api/Axios";
import Diary from "./Diary";
import { PayContext } from "../../context/Paystore";
import { useNavigate } from "react-router-dom";

const Block = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 40%;
  height: 700px;
  border-radius: 5px;
  background-color: #333333;
  padding-bottom: 2%;
  box-shadow: 0 0 4px black;
  @media (max-width: 768px) {
    width: 90%;
    height: 600px;
    position: fixed;
    z-index: 3;
    display: ${(props) => (props.changeModal ? "flex" : "none")};
    padding-bottom: 5%;
  }
  h1 {
    padding: 3%;
    height: 30px;
    font-size: 1.3em;
    color: #ff6f2c;
    font-weight: bold;
  }
  h2 {
    padding: 3%;
    height: 30px;
    font-size: 1.1em;
    color: #ffffff;
    font-weight: bold;
  }
  .box1 {
    display: flex;
    flex-direction: column;
    width: 90%;
    height: 35%;
    background-color: white;
    border-radius: 5px;
  }
  .daybox {
    display: flex;
    justify-content: end;
    align-items: center;
    width: 90%;
    height: 10%;
    @media (max-width: 768px) {
      justify-content: center;
      font-size: 1.5em;
      height: 6%;
    }
  }
  .subbox {
    width: 100%;
    height: 90%;
    display: flex;
    padding: 10px;
    align-items: center;
    justify-content: center;
  }

  .slidebox {
    width: 88%;
    height: 70%;
    display: block;
    .slick-next:before {
      color: #333333;
      font-size: 20px;
      display: flex;
      justify-content: end;
    }
    .slick-prev:before {
      color: #333333;
      font-size: 20px;
      display: flex;
    }
    .slick-prev,
    .slick-next {
      width: 100px;
      height: 100px;
      top: 45%;
    }
  }
  .circlebox {
    width: 250px;
    height: 100px;
  }
  .xbox {
    display: none;
    font-size: 40px;
    position: absolute;
    top: 5px;
    right: 10px;
    cursor: pointer;
    color: white;
    &:hover {
      color: #ff6f2c;
    }
    @media (max-width: 768px) {
      display: flex;
    }
  }
`;

const CirclePlus = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  font-size: 100px;
  color: grey;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MobileBlock=styled.div`
  @media (max-width: 768px) {
  width: 100vw;
  height: 100vh;
  background-color: white;
  position: fixed;
  top: 0;
  z-index: 2;
  display: ${(props) => (props.changeModal ? "flex" : "none")};}
`;

const Eventbox = (props) => {
  const { day } = props;
  const navigate = useNavigate();
  const [quest, setQuest] = useState([]);
  const [gender, setGender] = useState("");
  const [petList, setPetList] = useState([]);
  const [questList, setQuestList] = useState([]);
  const [age, setAge] = useState("");
  const [sign, setSign] = useState("");
  const [name, setName] = useState("");
  const [petId, setPetId] = useState();
  const [petimg, setPetimg] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [changeModal, setChangeModal] = useState(false);
  const context = useContext(PayContext);
  const { setIsTrue } = context;
  const closeModal = () => {
    setModalOpen(false);
    setIsTrue((prev) => !prev);
  };
  const closeChange = () => {
    setChangeModal(false);
  };

  const circleClick = (name, petimg, gender, age, sign, id) => {
    setGender(gender);
    setAge(age);
    setSign(sign);
    setPetimg(petimg);
    setName(name);
    setPetId(id);
    quistClick(id);
    setModalOpen(true);
    setIsTrue((prev) => !prev);
  };

  useEffect(() => {
    setChangeModal(true);
    const petGet = async () => {
      setQuestList([]);
      try {
        const resp = await AxiosApi.petGet(
          window.localStorage.getItem("email")
        );
        if (resp.status === 200) {
          console.log(resp.data);
          setPetList(resp.data);
          for (let item of resp.data) {
            try {
              const res = await AxiosApi.QuestDetail(item.id, day);
              console.log(res.data);
              setQuestList((plusList) => plusList.concat(res.data));
            } catch (e) {
              console.log("수행 데이터가없습니다");
            }
          }
        }
      } catch (e) {
        console.error(e);
      }
    };

    petGet();
  }, [day, modalOpen]);

  const data = {
    quest1: false,
    quest2: false,
    quest3: false,
    quest4: false,
    quest5: false,
  };

  const quistClick = async (id) => {
    console.log(id, day);

    try {
      const resp = await AxiosApi.QuestDetail(id, day);
      if (resp.status === 200) {
        console.log(resp.data);
        setQuest(resp.data);
        setIsTrue((prev) => !prev);
      }
    } catch (e) {
      setQuest(data);
      console.log("데이터가 없습니다.");
    }
  };
  const calculateQuestPercent = (id) => {
    const listItem = questList.find((item) => item.petId === id);
    if (!listItem) {
      return 0;
    }
    let count = 0;
    ["quest1", "quest2", "quest3", "quest4", "quest5"].forEach((quest) => {
      if (listItem[quest] === true) {
        count++;
      }
    });

    return count * 20;
  };

  const settings = {
    slide: "div",
    autoplay: false, // 자동 스크롤 사용 여부
    pauseOnHover: true,
    autoplaySpeed: 2000, // 자동 스크롤 시 다음으로 넘어가는데 걸리는 시간 (ms)
    infinite: false, // 무한
    dots: false, //
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    arrows: true,
    draggable: true,
    responsive: [
      {
        breakpoint: 1280, //화면 사이즈 960px일 때
        settings: {
          slidesToShow: 2, //위에 옵션이 디폴트 , 여기에 추가하면 그걸로 변경
        },
      },
      {
        breakpoint: 768, //화면 사이즈 768px일 때
        settings: {
          slidesToShow: 3, //위에 옵션이 디폴트 , 여기에 추가하면 그걸로 변경
        },
      },
    ],
  };

  return (
    <>
      <Block changeModal={changeModal}>
        <div className="xbox" onClick={closeChange}>
          &times;
        </div>
        <div className="daybox">
          <h2>{day} DIARY</h2>
        </div>
        <div className="box1">
          <h1>💡금일 미션💡</h1>
          <div className="subbox">
            <div className="slidebox">
              <Slider {...settings}>
                {petList.map((pet, index) => (
                  <div
                    key={index}
                    className="circlebox"
                    onClick={() =>
                      circleClick(
                        pet.petName,
                        pet.imageLink,
                        pet.gender,
                        pet.birthDate,
                        pet.detail,
                        pet.id
                      )
                    }
                  >
                    <CircleProgressBar
                      progress={calculateQuestPercent(pet.id)}
                      dogimg={pet.imageLink}
                    />
                  </div>
                ))}
                <div className="circlebox" onClick={() => navigate("/mypage")}>
                  <CirclePlus>+</CirclePlus>
                </div>
              </Slider>
            </div>
          </div>
        </div>
        <Diary day={day} />
      </Block>
      <QuistModal
        type={1}
        open={modalOpen}
        close={closeModal}
        petName={name}
        petImg={petimg}
        petGender={gender}
        petAge={age}
        petSign={sign}
        id={petId}
        day={day}
        quest={quest}
      />
      <MobileBlock changeModal={changeModal}/>
    </>
  );
};

export default Eventbox;
