import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Modal from "../utill/Modal";
import AxiosApi from "../../src/api/Axios";
import Common from "../utill/Common";
import { ReactComponent as Logo } from "../icon/petmemori.svg";
import kakaoLogin from "../img/kakao_login_large_narrow.png";

const Container = styled.div`
  width: 400px;
  height: auto;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);
  border-radius: 8px;

  .Enter {
    width: 400px;
    height: auto;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    border-radius: 8px;

    @media (max-width: 1280px) {
      width: 350px;
    }
  }

  @media (max-width: 1280px) {
    width: 350px;
  }

  & .login {
    margin: 0 auto;

    font: normal normal bold 24px/35px Poppins;
    letter-spacing: 0px;
    color: black;
    opacity: 1;
  }
  .success {
    color: green;
  }
  .error {
    color: red;
  }
  .Logo {
    width: 200px;
    margin-top: 2rem;
    cursor: pointer;
  }
`;

const Items = styled.div`
  cursor: pointer;

  &.item1 {
    width: 400px;
    height: 50px;

    img {
      width: 100%;
    }
  }
  &.item2 {
    width: 60%;
    margin: 8px auto;
  }
  &.item3 {
    width: 50%;
    margin-top: 20px;
    justify-content: center;
    color: black;
    font-size: 14px;
    display: flex;
    margin-bottom: 2rem;
  }

  &.signup {
    justify-content: right;
    font-weight: 700px;
    font-size: 14px;

    .link_style {
      color: #000000;
      text-decoration-line: none;
    }
  }
  &.signin {
    justify-content: right;
    font-weight: 700px;
    margin-right: 30px;
    font-size: 14px;

    .link_style {
      color: #000000;
      text-decoration-line: none;
    }
  }
  &.FindIdPwd,
  &.signup {
    span {
      text-decoration: underline;
    }

    &:hover {
      span {
        color: #f95001;
        text-decoration-line: underline;
      }
    }
  }
`;

const Input = styled.input`
  width: 100%; /* 원하는 너비 설정 */
  line-height: normal; /* line-height 초기화 */
  padding: 0.8em 0.5em; /* 원하는 여백 설정, 상하단 여백으로 높이를 조절 */
  font-family: inherit; /* 폰트 상속 */
  border: 1px solid #999;
  border-radius: 8px; /* iSO 둥근모서리 제거 */
  outline-style: none; /* 포커스시 발생하는 효과 제거를 원한다면 */
`;

const Button1 = styled.button`
  margin-top: 10px;
  margin-left: 30px;
  margin-right: 30px;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 26px;
  font-weight: bold;
  width: 60%; /* 원하는 너비 설정 */
  height: 45px;
  color: white;
  background-color: #333333;
  font-size: 20px;
  font-weight: 400;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-family: inherit;

  &:active {
    //확인 클릭하면 설정
    border: #999;
    font-weight: 700;
    background-color: #5c5b5b;
  }
`;

const Button2 = styled.button`
  margin-top: 10px;
    margin-left: 30px;
    margin-right: 30px;
    font-weight: bold;
    width: 60%; /* 원하는 너비 설정 */
    height: 45px;
    color: black;
    background-image: url(${kakaoLogin});
    border-radius: 8px;
    border: none;
    cursor: pointer;
    background-size: cover; /* 이미지를 버튼에 맞게 늘리거나 축소함 */
    background-repeat: no-repeat; /* 이미지 반복을 방지 */
    background-position: center;

  &:active {
    //확인 클릭하면 설정
    border: #999;
    font-weight: 700;
    background-color: #b3b601;
  }
`;

const Box = styled.div`
  width: 40vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const CenteredContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Login = () => {
  const navigate = useNavigate();

  // 키보드 입력
  const [inputEmail, setInputEmail] = useState("");
  const [inputPw, setInputPw] = useState("");

  // 오류 메시지
  const [idMessage, setIdMessage] = useState("");
  const [pwMessage, setPwMessage] = useState("");

  // 유효성 검사
  const [isId, setIsId] = useState("");
  const [isPw, setIsPw] = useState("");

  const [modalContent, setModalContent] = useState("");

  //팝업 처리
  const [modalOpen, setModalOpen] = useState(false);
  const closeModal = () => {
    setModalOpen(false);
  };

  // 5~ 20자리의 영문자, 숫자, 언더스코어(_)로 이루어진 문자열이 유효한 아이디 형식인지 검사하는 정규표현식
  const onChangeEmail = (e) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    setInputEmail(e.target.value);
    if (!emailRegex.test(e.target.value)) {
      setIdMessage("이메일 형식이 올바르지 않습니다.");
      setIsId(false);
    } else {
      setIdMessage("올바른 형식 입니다.");
      setIsId(true);
    }
  };
  const onChangePw = (e) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
    const passwordCurrent = e.target.value;
    setInputPw(passwordCurrent);
    if (!passwordRegex.test(passwordCurrent)) {
      setPwMessage("숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!");
      setIsPw(false);
    } else {
      setPwMessage("");
      setIsPw(true);
    }
  };

  const onClickLogin = async () => {
    try {
      const res = await AxiosApi.Login(inputEmail, inputPw);
      console.log(res.data);
      if (res.data.grantType === "Bearer") {
        Common.setAccessToken(res.data.accessToken);
        Common.setRefreshToken(res.data.refreshToken);
        if(inputEmail==="admin"){
          navigate("/ad")
        } else {
          navigate("/");
        };


      } else {
        setModalOpen(true);
        setModalContent("아이디 및 패스워드를 재확인해 주세요.^^");
      }
    } catch (err) {
      console.log(err);
      setModalOpen(true);
      setModalContent("아이디 및 패스워드를 재확인해 주세요.^^");
    }
  };

  const enterLogin = (e) => {
    e.preventDefault();
    onClickLogin();
  };

  const Rest_api_key = "afb202ab4753ffdab4ab8549b0395416"; //REST API KEY
  const redirect_uri = "http://www.petmemoir.store/auth"; //Redirect URI
  // oauth 요청 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

  const handleLogin = () => {
    window.location.href = kakaoURL;
  };

  return (
    <CenteredContainer>
      <Box>
        <Container>
          <form onSubmit={enterLogin} className="Enter">
            <Logo className="Logo" onClick={() => navigate("/")} />
            <Items className="login"></Items>
            <Items className="item2">
              <Input
                placeholder="아이디 (이메일 형식)"
                value={inputEmail}
                onChange={onChangeEmail}
              />
            </Items>
            <Items className="item2">
              <Input
                type="password"
                placeholder="패스워드 (숫자, 영문, 특수문자 조합)"
                value={inputPw}
                onChange={onChangePw}
              />
            </Items>
            <Button1 onClick={onClickLogin}>로그인</Button1>
          </form>
          <Button2 onClick={handleLogin}></Button2>

          <Modal open={modalOpen} close={closeModal} header="오류">
            아이디 및 패스워드를 확인해 주세요.
          </Modal>
          <Items
            className="item3"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Items className="FindIdPwd">
              <span onClick={() => navigate("/FindIdPwd")}>
                아이디 / 비밀번호 찾기
              </span>
            </Items>
            <Items className="signup">
              <span onClick={() => navigate("/Signup")}>회원가입</span>
            </Items>
          </Items>
        </Container>
      </Box>
    </CenteredContainer>
  );
};
export default Login;
