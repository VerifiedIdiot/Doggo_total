import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import Petmodal from "../../utill/Petmodal";
import AxiosApi from "../../api/Axios";
import petprofile from "../../img/petprofile2.png";

const BoxContent = styled.div`
  /* min-width: 400px; */
  border-radius: 8px;
  overflow-y: scroll;
  overflow-x: hidden;
  height: 87vh;
  min-height: 850px;

  &::-webkit-scrollbar {
    width: 13px; // 스크롤바의 너비
  }

  &::-webkit-scrollbar-thumb {
    background-color: #333333; // 스크롤바 색상
    border-radius: 7px; // 스크롤바 모양 (모서리 둥글게)
  }

  &::-webkit-scrollbar-track {
    background-color: #858585; // 스크롤바 색상
    border-radius: 7px; // 스크롤바 모양 (모서리 둥글게)
    // F3EEEA, EBE3D5, FFEED9, B0A695
  }
`;

const BoxTitle = styled.div`
  font-size: 32px;
  font-weight: 900;
  margin-bottom: 1rem;
`;

const BoxContent1 = styled.div`
  width: 99%;
  background-color: #ebebeb;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  border-radius: 8px;
  justify-content: space-between;
  padding: 10px;
  padding: 1rem;

  @media (max-width: 1280px) {
      display: flex;
      flex-direction: column;
    }
`;

const PetProfile = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 100%;
  background-image: url(${petprofile});
    background-position: center;
    flex-shrink: 0;
    margin-left: 3rem;

    @media (max-width: 1280px) {
      width: 190px;
      height: 190px;
      margin-left: 0;
    }
`;

const PetInfo1 = styled.div`
  position: relative;
  border-radius: 8px;
  padding: 10px 14px 10px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  z-index: 1;

  .PetSign {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 1rem;

    & > span {
      line-height: 30px;
    }
  }

  .DogFootImage {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const PetInfo2 = styled.div`
  margin-right: 5rem;
    white-space: nowrap;
`;

const PetInfo3 = styled.div`
  display: flex;
  flex-direction: column;
  height: 25vh;
  width: 20%;
  max-height: 100px;
`;

const Btn = styled.button`
  padding: 10px;
  border-radius: 8px;
  font-size: 15px;
  color: white;
  background-color: #333333;
  box-sizing: border-box;
  border: none;
  white-space: nowrap;
  cursor: pointer;

  &:active {
    background-color: #575656;
  }
`;

// 나이 계산 함수
const calculateAge = (birthdate) => {
  const birthDate = new Date(birthdate);
  const currentDate = new Date();

  const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

  const ageInDays = (currentDate - birthDate) / oneDayInMilliseconds;

  const age = Math.floor(ageInDays / 365);

  return age;
};

const Petprofile = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [petName, setPetName] = useState("");
  const [petGender, setPetGender] = useState("");
  const [petAge, setPetAge] = useState("");
  const [petBreed, setPetBreed] = useState("");
  const [petSign, setPetSign] = useState("");
  const [petImg, setPetImg] = useState("");
  const [petType, setPetType] = useState("");
  const [type, setType] = useState();
  const [id, setId] = useState("");

  const closeModal = () => {
    setModalOpen(false);
  };

  const openClick = (a, name, gender, age, breed, sign, img, Type, id) => {
    setType(a);
    setModalOpen(true);
    setPetName(name);
    setPetAge(age);
    setPetGender(gender);
    setPetSign(sign);
    setPetBreed(breed);
    setPetImg(img);
    setPetType(Type);
    setId(id);
  };

  const [list, setList] = useState([]);

  const petGet = async () => {
    try {
      const resp = await AxiosApi.petGet(window.localStorage.getItem("email"));
      if (resp.status === 200) {
        setList(resp.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    petGet();
  }, [modalOpen]);

  const handleDelete = async (id, petName) => {
    try {
      if (window.confirm(`${petName}을 삭제하시겠습니까?`)) {
        await AxiosApi.petDel(`${id}`);
        alert("반려동물이 삭제되었습니다.");
        petGet();
      }
    } catch (error) {
      console.log(error);
      alert("반려동물 삭제에 실패했습니다.");
      console.log(id);
      console.log(list);
    }
  };

  return (
    <div>
      <BoxTitle>펫 프로필</BoxTitle>
      <BoxContent>
        {list.map((list, index) => (
          <BoxContent1 key={index}>
            <PetProfile src={list.imageLink} />
            <PetInfo1>
              <PetInfo2>
                <div className="PetSign">이름 : {list.petName}</div>
                <div className="PetSign">성별 : {list.gender}</div>
                <div className="PetSign">
                  나이 : {calculateAge(list.birthDate)} 세 ({list.birthDate}{" "}
                  출생)
                </div>
                <div className="PetSign">
                  <span>종 : {list.breed}</span>
                </div>
                <div className="PetSign">특이사항 : {list.detail}</div>
                <div className="PetSign">
                  {list.animalType &&
                    (list.animalType.animalType === "DOG"
                      ? "강아지"
                      : "고양이")}
                </div>
              </PetInfo2>
              <PetInfo3>
                <Btn
                  style={{ marginBottom: "1rem" }}
                  onClick={() =>
                    openClick(
                      2,
                      list.petName,
                      list.gender,
                      list.birthDate,
                      list.breed,
                      list.detail,
                      list.imageLink,
                      list.animalType.id,
                      list.id
                    )
                  }
                >
                  수정
                </Btn>
                <Btn onClick={() => handleDelete(list.id, list.petName)}>
                  삭제
                </Btn>
              </PetInfo3>
            </PetInfo1>
          </BoxContent1>
        ))}
        <BoxContent1>
          <PetProfile/>
          <PetInfo1>
            <PetInfo2>
              <div className="PetSign">더 많은 친구들을 추가해보세요!</div>
            </PetInfo2>
            <PetInfo3>
              <Btn onClick={() => openClick(1)}>추가</Btn>
            </PetInfo3>
          </PetInfo1>
        </BoxContent1>
      </BoxContent>
      <Petmodal
        type={type}
        open={modalOpen}
        close={closeModal}
        name={petName}
        gender={petGender}
        age={petAge}
        breed={petBreed}
        img={petImg}
        sign={petSign}
        Type={petType}
        id={id}
      ></Petmodal>
    </div>
  );
};
export default Petprofile;
