import { Outlet, useNavigate, useLocation } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { ReactComponent as Logo } from "../icon/petmemori.svg";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import AgreementModal from "../utill/Agreement/AgreementModal";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { UserContext } from "../context/Paystore";
import Common from "../utill/Common";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";

const Container = styled.div`
  width: 100%;
  height: 100%;
  color: black;
`;

const Headers = styled.div`
  position: ${({ $isHomePage }) => ($isHomePage ? "fixed" : "sticky")};
  top: 0;
  z-index: 200;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(5px);
  width: 100%;
  background-color: ${({ $isHovered }) =>
    $isHovered ? "white" : "transparent"};
  transition: background-color 0.1s ease;
  @media (max-width: 768px) {
    position: sticky;
    height: 80px;
  }
`;

const NavBox = styled.div`
  position: relative;
  z-index: 111;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  height: 10%;
  font-weight: bold;
  left: 0;
  .icons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: auto;
    align-items: start;
    h1 {
      font-size: 1.3em;
    }
    p {
      padding: 0 5px;
    }
    @media (max-width: 768px) {
      width: 50px;
    }
  }
  .icon {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 45px;
    width: 33%;
    cursor: pointer;
    font-weight: bold;
    font-size: 11px;
    &:hover {
      color: #f95001;
    }
    @media (max-width: 768px) {
      display: none;
    }
  }
  .listIcon {
    display: none;
    height: 45px;
    width: 33%;
    cursor: pointer;
    font-weight: bold;
    font-size: 12px;
    @media (max-width: 768px) {
      display: flex;
      align-items: center;
    }
  }
  .none {
    width: 150px;
    @media (max-width: 768px) {
      display: none;
    }
  }
  @media (max-width: 768px) {
    width: 100%;
    padding: 10px;
    margin-bottom: 1em;
  }
  .logo {
    width: 120px;
    height: 80px;
    object-fit: cover;
    cursor: pointer;
  }
`;

const Menus = styled.div`
  display: flex;
  visibility: visible;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 46px;
  margin-bottom: 1em;
  box-shadow: ${({ $isHovered }) =>
    $isHovered ? "0px 0px 20px #dadada" : "none"};
  align-items: center;
  background-color: ${({ $isHovered }) =>
    $isHovered ? "white" : "transparent"};
  position: sticky;
  transition: all 0.1s ease;
  top: 70px;
  z-index: 100;
  @media (max-width: 1280px) {
    font-size: 0.7em;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

const Menu = styled.p`
  display: ${({ $isHovered }) => ($isHovered ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 45px;
  width: 8%;
  cursor: pointer;
  &:hover {
    border-bottom: 3px solid #f95001;
  }

`;

const Contain = styled.div`
  margin: 0 auto;
`;

const Footer = styled.div`
  height: 200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 25px;
  line-height: 60px;
  color: #8a8c8f;
  background-color: #333333;
  .linkBox {
    display: flex;
    flex-direction: row;
    width: 40%;
    align-items: center;
    justify-content: start;
  }
  .linkBox:nth-child(2) {
    @media (max-width: 768px) {
      display: none;
    }
  }
  h1 {
    display: flex;
    font-size: 0.7em;
    padding: 0 2%;
    white-space: nowrap;
    text-decoration: underline;
    cursor: pointer;
    &:hover {
      font-weight: bold;
      color: #f95001;
    }
  }
  .infoBox {
    width: 80%;
    display: flex;
    align-items: end;
    justify-content: space-between;
    flex-direction: row;
    h2 {
      font-size: 0.8em;
      line-height: 1.2;
      @media (max-width: 768px) {
        font-size: 0.5em;
      }
    }
  }
`;
const Main = styled.div`
  max-width: 75%;
  padding-bottom: 2%;
  margin: 0 auto;
  @media (max-width: 1280px) {
    max-width: 85%;
  }
  @media (max-width: 768px) {
    max-width: 90%;
  }
`;
const slideFromLeft = keyframes`
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`;

const List = styled.div`
  position: fixed;
  top: 0;
  z-index: 220;
  display: ${(props) => (props.$isList ? "flex" : "none")};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: black;
  background-color: #ffffff;
  width: 100vw;
  height: 100%;
  animation: ${slideFromLeft} 0.3s ease-in-out forwards;
  @media (min-width: 768px) {
    display: none;
  }
  .out {
    display: flex;
    cursor: pointer;
  }
  .list {
    padding: 20px;
    position: absolute;
    top: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .list1 {
    display: flex;
    height: 12%;
    width: 80%;
    margin-bottom: 1%;
    box-shadow: 1px 1px 3px black;
    align-items: center;
    flex-direction: row;
    justify-content: center;
    font-size: 1.2em;
    cursor: pointer;
    &:hover {
      background-color: #f94f0161;
    }
    &:active {
      background-color: #f95001;
    }
  }
  .list2 {
    display: flex;
    height: 5%;
    width: 60%;
    align-items: center;
    flex-direction: row;
    justify-content: space-around;
    font-size: 0.8em;
  }
  .icon {
    cursor: pointer;
    text-decoration: underline;
    &:hover {
      font-weight: bold;
    }
  }
`;

const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const navigate = useNavigate();
  const [openList, setOpenList] = useState(false);
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState("");
  const [email, setEmail] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const closeModal = () => {
    setModalOpen(false);
  };
  const openModal = (a) => {
    setModalInfo(a);
    setModalOpen(true);
  };
  const clickList = () => {
    setOpenList(true);
  };
  const ListDown = () => {
    setOpenList(false);
  };
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition < 20) {
        setIsHeaderHovered(false);
      } else {
        setIsHeaderHovered(true);
      }
    };
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setOpenList(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const islogin = async () => {
      try {
        const res = await Common.TakenToken();
        setEmail(res.data);
      } catch (e) {
        console.log("로그인해주세요!");
      }
    };
    islogin();
  }, [email]);

  const logOut = () => {
    Common.setAccessToken("");
    Common.setRefreshToken("");
    setEmail("");
    alert("로그아웃 되셨습니다.");
  };

  useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth <= 768);
      window.addEventListener("resize", handleResize);
      handleResize(); // 초기 실행
      return () => window.removeEventListener("resize", handleResize);
    }, []);

  return (
    <Container>
      <Headers
        onMouseEnter={() => setIsHeaderHovered(true)}
        onMouseLeave={() => setIsHeaderHovered(false)}
        $isHovered={isHeaderHovered}
        $isHomePage={isHomePage}
      >
        <NavBox>
          {email ? (
            <div className="none" onClick={() => navigate("/mypage")}>
              <h1>{email}<br/>환영합니다</h1>
            </div>
          ) : (
            <div className="none">
            </div>
          )}
          <Logo className="logo" onClick={() => navigate("/")} />
          <div className="icons">
            {email ? (
              <>
                <div className="icon" onClick={() => navigate("/mypage")}>
                  <PermIdentityOutlinedIcon />
                  <p>MYPAGE</p>
                </div>
                <div className="icon" onClick={() => navigate("/quick/sales")}>
                  <ShoppingCartIcon />
                  <p>Shoping</p>
                </div>
                <div className="icon" onClick={logOut}>
                  <LoginRoundedIcon />
                  <p>LogOut</p>
                </div>
              </>
            ) : (
              <>
                <div className="icon" onClick={() => navigate("/login")}>
                  <LoginIcon />
                  <p>LOGIN</p>
                </div>
                <div className="icon" onClick={() => navigate("/signup")}>
                  <PersonAddAltOutlinedIcon />
                  <p>SIGNUP</p>
                </div>
                <div className="icon" onClick={() => navigate("/mypage")}>
                  <PermIdentityOutlinedIcon />
                  <p>MYPAGE</p>
                </div>
              </>
            )}

            <div className="listIcon" onClick={() => clickList()}>
              <MenuOutlinedIcon sx={{ fontSize: 35 }} />
            </div>
          </div>
        </NavBox>
      </Headers>
      <List $isList={openList} onClick={ListDown}>
        <div className="list">
          <Logo width={130} onClick={() => navigate("/")} />
          <div className="out" onClick={ListDown}>
            <CloseIcon sx={{ fontSize: 35 }} />
          </div>
        </div>
        {!isMobile && (
        <div className="list1" onClick={() => navigate("/about")}>
          ABOUT US
        </div>
        )}
        <div className="list1" onClick={() => navigate("/diy")}>
          PET'S DIARY
        </div>
        <div className="list1" onClick={() => navigate("/map")}>
          MAPS
        </div>
        <div className="list1" onClick={() => navigate("/book")}>
          PET'S BOOKS
        </div>
        <div className="list1" onClick={() => navigate("/quick")}>
          정기 구독
        </div>
        <div className="list1" onClick={() => navigate("/service")}>
          고객지원 Q&A
        </div>
        <div className="list2">
          <div className="icon" onClick={() => navigate("/login")}>
            <p>LOGIN</p>
          </div>
          <div className="icon" onClick={() => navigate("/signup")}>
            <p>SIGN UP</p>
          </div>
          <div className="icon" onClick={() => navigate("/mypage")}>
            <p>MYPAGE</p>
          </div>
        </div>
      </List>
      <Menus
        onMouseEnter={() => setIsHeaderHovered(true)}
        onMouseLeave={() => setIsHeaderHovered(false)}
        $isHovered={isHeaderHovered}
      >
      {!isMobile && (
        <Menu $isHovered={isHeaderHovered} onClick={() => navigate("/about")}>
         ABOUT US
        </Menu>
         )}
        <Menu $isHovered={isHeaderHovered} onClick={() => navigate("/diy")}>
          PET'S DIARY
        </Menu>
        <Menu $isHovered={isHeaderHovered} onClick={() => navigate("/map")}>
          MAPS
        </Menu>
        <Menu
          $isHovered={isHeaderHovered}
          className="icon"
          onClick={() => navigate("/book")}
        >
          PET'S BOOKS
        </Menu>
        <Menu $isHovered={isHeaderHovered} onClick={() => navigate("/quick")}>
          정기 구독
        </Menu>
        <Menu $isHovered={isHeaderHovered} onClick={() => navigate("/service")}>
          Q&A
        </Menu>
      </Menus>

      <Contain>
        <Main>
          <Outlet />
        </Main>
        <Footer>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "80%",
            }}
          >
            <div className="linkBox">
              <h1 onClick={() => openModal("개인정보처리방침")}>
                개인정보처리방침
              </h1>
              <h1 onClick={() => openModal("이용약관")}>이용약관</h1>
              <h1 onClick={() => openModal("책임의 법적고지")}>
                책임의 법적고지
              </h1>
              <h1 onClick={() => openModal("무단수집거부")}>무단수집거부</h1>
            </div>
            <div className="linkBox one" style={{ justifyContent: "end" }}>
              <h1>
                <InstagramIcon />
              </h1>
              <h1>
                <FacebookIcon />
              </h1>
              <h1>
                <TwitterIcon />
              </h1>
            </div>
          </div>
          <div className="infoBox">
            <div>
              <h2>(주) PETEMOIR대표 : 손인천,정벼리,김지은,차하늘,김현빈</h2>
              <h2> 회사 주소 : 서울특별시 강남구 테헤란로14길 6</h2>
              <h2> EMAIL : sonincheon94@naver.com </h2>
              <h2>사업자등록번호 : 999-99-00099</h2>
            </div>
            <div></div>
            <h2>ⓒ Pet Memoir.</h2>
          </div>
        </Footer>
        <AgreementModal
          open={modalOpen}
          close={closeModal}
          header={modalInfo}
        />
      </Contain>
    </Container>
  );
};

export default Header;