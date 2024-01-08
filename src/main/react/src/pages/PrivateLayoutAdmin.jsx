import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Common from "../utill/Common";
import styled from "styled-components";

const OutScreen =styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  background-color: white;
  z-index: 10000;
  top: 0;
  left: 0;
  display: ${props => props.onScreen ? "block" : "none"};
`;
// 접근 제한 컴포넌트
const PrivateLayoutAdmin = () => {
  const navigate = useNavigate();
  const [onScreen, setOnScreen]=useState(true);

  useEffect(() => {
    const IsAdmin = async () => {
      const accessToken = Common.getAccessToken();
      try {
        const res = await Common.TakenToken();
        const email = res.data;
        if (email === "admin") { // email이 admin인 경우만 접근허용
            console.log("관리자님 안녕하세요!");
            setOnScreen(false);
        } else {
            alert("관리자만 접근 가능합니다.");
            navigate("/");
        }
      } catch (e) {
        console.log(e);
              alert("관리자 로그인이 필요합니다.");
              navigate("/login")
      }};

    IsAdmin();
  }, []);

  return (
    <>
      <OutScreen onScreen={onScreen}/>
      <Outlet />
    </>
  );
};

export default PrivateLayoutAdmin;
