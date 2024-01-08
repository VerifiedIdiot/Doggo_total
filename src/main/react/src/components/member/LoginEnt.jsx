import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Info = styled.div`
  font-size: 13px;
  margin-bottom: 20px;
  margin-top: 20px;
`;

const LoginBtn = styled.button`
  width: 250px;
  height: 40px;
  border-radius: 10px;
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 16px;
  color: white;
  background-color: #776b5d;
  border: none;
`;

const KakaoBtn = styled.button`
  width: 250px;
  height: 40px;
  border-radius: 10px;
  margin-bottom: 20px;
  background-color: #faff00;
  font-weight: bold;
  font-size: 16px;
  border: none;
`;

const More = styled.div`
  width: 200px;
  height: 30px;
  font-size: 10px;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

const More1 = styled.div`
  height: 20px;
  font-size: 10px;
  margin-left: 5px;
  margin-right: 5px;
  text-decoration: underline;

  &:hover {
    color: blue; /* 호버 시 글자 색상 변경 */
    text-decoration: underline; /* 호버 시 밑줄 추가 */
  }
`;

const LoginEnt = () => {
  const navigate = useNavigate();

  const Rest_api_key = "afb202ab4753ffdab4ab8549b0395416"; //REST API KEY
  const redirect_uri = "http://localhost:3000/auth"; //Redirect URI
  // oauth 요청 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  const handleLogin = () => {
    window.location.href = kakaoURL;
  };

  return (
    <div>
      <Container>
        <Info>멍냥멍냥을 더 재미있고 편리하게 이용하세요</Info>
        <LoginBtn onClick={() => navigate("/login")}>멍냥멍냥 로그인</LoginBtn>
        <KakaoBtn onClick={handleLogin}>카카오톡 로그인</KakaoBtn>
        <More>
          <More1 onClick={() => navigate("/FindIdPwd")}>
            아이디 / 비밀번호 찾기
          </More1>
          <More1 onClick={() => navigate("/signup")}>회원가입</More1>
        </More>
      </Container>
    </div>
  );
};
export default LoginEnt;
