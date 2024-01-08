import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import Usermodal from "../../utill/Usermodal";
import Pwdmodal from "../../utill/Pwdmodal";
import Imgmodal from "../../utill/Imgmodal";
import AxiosApi from "../../api/Axios";
import profile from "../../img/profile2.png";

const BoxContent = styled.div`
  border-radius: 8px;
  min-height: 850px;
`;

const BoxTitle = styled.div`
  font-size: 32px;
  margin-bottom: 1rem;
  font-weight: bold;
`;

const BoxContent1 = styled.div`
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    height: 200px;
  }
`;

const BoxContent2 = styled.div`
  margin-top: 10px;
`;

const Btn = styled.button`
  padding: 10px;
  border-radius: 8px;
  font-size: 15px;
  color: white;
  background-color: #333333;
  box-sizing: border-box;
  vertical-align: bottom;
  border: none;
  white-space: nowrap;
  cursor: pointer;

  &:active {
    background-color: #575656;
  }

  @media (max-width: 1280px) {
    width: 40px;
    font-size: 11px;
  }
`;

const InputBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;

  font-size: 14px;
  font-weight: bold;
  padding-left: 5px;
  margin-bottom: 1rem;

  .item1 {
    width: 30%;
    white-space: nowrap;
  }
  .item2 {
    width: 80%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
  }

  @media (max-width: 1280px) {
    .item1 {
      font-size: 12px;
    }
  }
`;

const Input = styled.div`
  width: 72%;
  height: 5vh;
  border-radius: 8px;
  margin-right: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  .Input {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      font-size: 15px;
    }

  @media (max-width: 1280px) {
    font-size: 14px;
  }
`;

const InputContainer = styled.div`
  width: 72%;
  height: 5vh;
  border-radius: 8px;
  margin-right: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  .Input {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 15px;
  }

  @media (max-width: 1280px) {
    font-size: 12px;
  }
`;

const Btn1 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 190px;
`;

const Btn2 = styled.button`
  width: 80%;
  height: 5vh;
  min-height: 40px;
  border-radius: 8px;
  font-size: 17px;
  font-weight: bold;
  color: white;
  background-color: #333333;
  box-sizing: border-box;
  vertical-align: bottom;
  margin-top: 8px;
  border: none;
  cursor: pointer;

  &:active {
    background-color: #575656;
  }
`;

const Profile = styled.div`
  position: relative;
  display: inline-block;
  overflow: hidden;
  width: 200px; /* 최대 너비 지정 */
  height: 200px; /* 최대 높이 지정 */
  border-radius: 50%;
  margin-bottom: 1rem;
  background-image: url(${profile});
  background-position: center;

  @media (max-width: 1280px) {
    width: 180px;
    height: 180px;
  }
`;

const ProfileImage = styled.img`
  width: 200px; /* 최대 너비 지정 */
  height: 200px; /* 최대 높이 지정 */
  object-fit: cover;
  transition: filter 0.3s ease; /* 부드러운 효과를 위한 트랜지션 속성 추가 */

  ${Profile}:hover & {
    filter: grayscale(100%) blur(5px); /* 마우스 호버 시 이미지에 효과 적용 */
  }

  @media (max-width: 1280px) {
    width: 180px;
    height: 180px;
  }
`;

const OverlayText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #f95001; /* 텍스트 색상 설정 */
  font-size: 25px; /* 텍스트 크기 설정 */
  font-weight: bold; /* 텍스트 굵기 설정 */
  pointer-events: none; /* 텍스트 위에 마우스 이벤트를 허용하지 않음 */
  opacity: 0; /* 초기에는 보이지 않도록 설정 */
  transition: opacity 0.3s ease; /* 투명도에 대한 부드러운 효과를 위한 트랜지션 속성 추가 */

  ${Profile}:hover & {
    opacity: 1; /* 마우스 호버 시 텍스트가 나타남 */
  }
`;

const Myprofile = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [headerName, setHeaderName] = useState("닉네임 변경");
  const [bodyName, setBodyName] = useState("닉네임");
  const [bodyContent, setBodyContent] = useState("");
  const [modalOpen1, setModalOpen1] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [changeCase, setChangeCase] = useState("");

  const [detail, setDetail] = useState("");

  const navigate = useNavigate();

  const closeModal = () => {
    setModalOpen(false);
  };

  const closeModal1 = () => {
    setModalOpen1(false);
  };

  const closeModal2 = () => {
    setModalOpen2(false);
  };

  const openClick = (Name, content, bodyConetent, changeCase) => {
    setHeaderName(Name);
    setBodyName(content);
    setBodyContent(bodyConetent);
    setChangeCase(changeCase);
    setModalOpen(true);
  };

  const openClick1 = (memberEmail) => {
      setModalOpen1(true);
      setEmail(memberEmail);
    };

  const openClick2 = (img, changeCase) => {
    setModalOpen2(true);
    setImage(img);
    setChangeCase(changeCase);
  };

  const memberDelete = async () => {
    try {
      if (window.confirm("탈퇴하시겠습니까?")) {
        await AxiosApi.memberDelete(window.localStorage.getItem("email"));
        alert("회원 탈퇴를 완료했습니다");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      alert("회원 탈퇴에 실패했습니다.");
    }
  };

  useEffect(() => {
    const getMember = async () => {
      try {
        const response = await AxiosApi.memberGet();
        console.log("detail.email:", response.data);
        setDetail(response.data);
      } catch (error) {
        console.log(error);
        console.log(detail);
      }
    };
    getMember();
  }, [modalOpen, modalOpen1, modalOpen2]);

  return (
    <div>
      <BoxTitle>내 프로필</BoxTitle>
      <BoxContent>
        <BoxContent1>
          <Profile>
            <ProfileImage
              src={detail.memberImage}
              onClick={() => openClick2(detail.memberImage, 4)}
            />
            <OverlayText>수정</OverlayText>
          </Profile>
        </BoxContent1>
        <div
          style={{
            textAlign: "center",
            fontSize: "1.4rem",
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          {detail.memberName}님
        </div>
        <BoxContent2>
          <InputBox>
            <div className="item1">이메일</div>
            <div className="item2">
              <Input>
                <div className="Input">{detail.memberEmail}</div>
              </Input>
            </div>
          </InputBox>
          <InputBox>
            <div className="item1">성별</div>
            <div className="item2">
              <Input>{detail.memberGender}</Input>
            </div>
          </InputBox>
          <InputBox>
            <div className="item1">생년월일</div>
            <div className="item2">
              <Input>
                <div className="Input">{detail.memberBirth}</div>
              </Input>
              <Btn
                onClick={() =>
                  openClick("생년월일 변경", "생년월일", detail.memberBirth, 1)
                }
              >
                수정
              </Btn>
            </div>
          </InputBox>
          <InputBox>
            <div className="item1">주소</div>
            <div className="item2">
              <InputContainer>
                <div className="Input">{detail.memberAddress}</div>
              </InputContainer>
              <Btn
                onClick={() =>
                  openClick("주소 변경", "주소", detail.memberAddress, 2)
                }
              >
                수정
              </Btn>
            </div>
          </InputBox>
          <InputBox>
            <div className="item1">전화번호</div>
            <div className="item2">
              <Input>{detail.memberTel}</Input>
              <Btn
                onClick={() =>
                  openClick("전화번호 변경", "전화번호", detail.memberTel, 3)
                }
              >
                수정
              </Btn>
            </div>
          </InputBox>
          <Btn1>
            <Btn2 onClick={() => openClick1(detail.memberEmail)}>
              비밀번호 변경
            </Btn2>
            <Btn2 onClick={() => navigate("/service")}>1대1 문의하기</Btn2>
            <Btn2 onClick={() => navigate("/quick/sales")}>구매 내역 조회</Btn2>
            <Btn2 onClick={memberDelete}>회원 탈퇴</Btn2>
          </Btn1>
        </BoxContent2>
      </BoxContent>
      <Usermodal
        open={modalOpen}
        close={closeModal}
        header={headerName}
        name={bodyName}
        detail={bodyContent}
        type={changeCase}
      ></Usermodal>
      <Pwdmodal
        type={1}
        open={modalOpen1}
        close={closeModal1}
        detail={email}
      ></Pwdmodal>
      <Imgmodal
        open={modalOpen2}
        close={closeModal2}
        header={headerName}
        name={bodyName}
        image={image}
        type={changeCase}
      ></Imgmodal>
    </div>
  );
};
export default Myprofile;
