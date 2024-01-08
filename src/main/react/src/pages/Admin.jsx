import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as Logo } from "../icon/petmemori.svg";
import { useState } from "react";

export const AdminContainer = styled.div`
  position: relative;
`;

export const SideBar = styled.div`
  width: 15vw;
  height: 100vh;
  background-color: #fff;
  color: #f3eeea;
  padding: 10px;

  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
 
  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .logoBox {
    width: 110px;
    cursor: pointer;
  }

  hr {
    border-style: none;
    border-bottom: 0.5px solid #999999;
    width: 100%;
    margin: 10%;
  }

  @media only screen and (max-width: 767px) {
    width: 100vw;
    height: 13vh;
    margin-left: 0;
    position: static;
    flex-direction: row;
    justify-content: space-evenly;
    white-space: nowrap;
    overflow: hidden;
    .logoBox {
      width: 90px;
    }
    hr {
      display: none;
    }
  }
  @media only screen and (max-width: 359px) {

    .logoBox {
      display: none;
    }
    }
`;

const Menus = styled.div`
  color: #2b2a2a;
  cursor: pointer;

  &:active,
  &:focus,
  &.active {
    color: #F95001;
    font-weight: bold;
  }
  
  &:hover p {
    color: #b4b4b4;
    transition: all 0.3s;
  }
`;

const Admin = () => {
  const navigate = useNavigate();
  const [ activeMenu, setActiveMenu ] = useState('');

  function handleClick(menu) {
    navigate(`/ad/${menu}`);
    setActiveMenu(menu);
  }

  return (
    <>
      <AdminContainer>
        <SideBar>
          <div className="logoBox">
            <Logo onClick={() => { navigate("/"); setActiveMenu(null); }}/>
          </div>
          <hr />
          <Menus className={activeMenu === '' ? 'active' : ''} onClick={() => handleClick('')}>
            <p>대쉬보드</p>
          </Menus>
          <hr />
          <Menus className={activeMenu === 'member' ? 'active' : ''} onClick={() => handleClick("member")}>
            <p>회원 관리</p>
          </Menus>
          <hr />
          <Menus className={activeMenu === 'sales' ? 'active' : ''} onClick={() => handleClick("sales")}>
            <p>판매 관리</p>
          </Menus>
          <hr />
          <Menus className={activeMenu === 'qna' ? 'active' : ''} onClick={() => handleClick("qna")}>
            <p>1:1 문의 관리</p>
          </Menus>
          <hr />
          <Menus className={activeMenu === 'feed' ? 'active' : ''} onClick={() => handleClick("feed")}>
            <p>사료 관리</p>
          </Menus>
          <hr />
          <Menus className={activeMenu === 'animal' ? 'active' : ''} onClick={() => handleClick("animal")}>
            <p>견종, 묘종 백과</p>
          </Menus>
          <hr />
        </SideBar>
      </AdminContainer>

      <Outlet />
    </>
  );
};

export default Admin;
