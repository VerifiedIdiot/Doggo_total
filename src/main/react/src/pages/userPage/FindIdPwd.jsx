import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import AxiosApi from "../../api/Axios";
import { ReactComponent as Logo } from "../../icon/petmemori.svg";
import Modal from "../../utill/Modal";

const Container = styled.div`
  width: 30vw;
  min-width: 410px;
  height: auto;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  margin-bottom: 3vh;
  padding: 8px;

  & .login {
    margin: 0 auto;
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

  .Title {
    font-size: 20px;
    font-weight: bold;
    padding: 1rem;
  }

  .Logo {
    cursor: pointer;
  }
`;

const Box = styled.div`
  width: 40vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .Logo {
    width: 200px;
  }
`;

const CenteredContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Item1 = styled.div`
  display: flex;
  width: 90%;
  justify-content: space-between;
  align-items: center;
  margin: 5px;
  font-size: 13px;
`;

const Item2 = styled.input`
  border-radius: 8px;
  width: 15vw;
  height: 4vh;
  min-width: 240px;
`;

const Item3 = styled.input`
  border-radius: 8px;
  width: 15vw;
  height: 4vh;
  min-width: 200px;
`;

const Button1 = styled.button`
  width: 100%;
  height: 30px;
  border-radius: 8px;
  background-color: #333333;
  color: white;
  cursor: pointer;

  &:active {
    //확인 클릭하면 설정
    border: #999;
    font-weight: 700;
    background-color: #5c5b5b;
  }
`;

const Button2 = styled.button`
  width: 5vw;
  height: 4vh;
  border-radius: 8px;
  background-color: #333333;
  color: white;
  cursor: pointer;
  min-width: 70px;

  opacity: ${(props) =>
    props.disabled ? "0.7" : "1"}; // 비활성화 상태일 때 투명도 설정

  &:active {
    //확인 클릭하면 설정
    border: #999;
    font-weight: 700;
    background-color: #5c5b5b;
  }
`;

const FindIdPwd = () => {
  const [inputName, setInputName] = useState("");
  const [inputTel, setInputTel] = useState("");
  const [foundId, setFoundId] = useState("");
  const [showFoundId, setShowFoundId] = useState(false);
  const [inputId, setInputId] = useState("");
  const [changePw, setChangePw] = useState("");

  const [inputCert, setInputCert] = useState("");
  const [sendEmail, setSendEmail] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [modalText, setModelText] = useState("중복된 아이디 입니다.");

  const [able, setAble] = useState(true);

  const navigate = useNavigate();

  const closeModal = () => {
    setModalOpen(false);
  };

  const onChangeName = (e) => {
    setInputName(e.target.value);
  };

  const onChangeTel = (e) => {
    setInputTel(e.target.value);
  };

  const findMemberId = async () => {
    try {
      const resp = await AxiosApi.findMemberId(inputName, inputTel);
      if (resp.status === 200) {
        setFoundId(resp.data);
        setShowFoundId(true); // 입력완료 시 아이디 보이게 처리
      } else {
        alert("가입된 정보가 없습니다.");
      }
    } catch (error) {
      console.log(error);
      alert("오류가 발생했습니다.");
    }
  };

  const hideEmail = (email) => {
    const [username, domain] = email.split("@");
    const hiddenPart = "*".repeat(Math.max(0, username.length - 3));

    return username.slice(0, 4) + hiddenPart + "@" + domain;
  };

  const SendEmail = async (email) => {
    const response = await AxiosApi.EmailCert(email);
    if (response.status === 200) {
      setModelText("인증번호가 발송되었습니다. 이메일을 확인해주세요");
      setModalOpen(true);
      setSendEmail(response.data);
    } else {
      setModelText("이메일 전송에 실패했습니다.");
    }
  };

  const SingupIdCheck = async (email) => {
    const resp = await AxiosApi.SingupIdCheck(email);
    console.log("가입 가능 여부 확인 : ", resp.data);
    if (resp.data === false) {
      const response = await AxiosApi.EmailCert(email);
      if (response.status === 200) {
        setModelText("인증번호가 발송되었습니다. 이메일을 확인해주세요");
        setModalOpen(true);
        setSendEmail(response.data);
      } else {
        setModelText("이메일 전송에 실패했습니다.");
      }
    } else {
      setModelText("존재하지 않는 이메일입니다.");
      setModalOpen(true);
    }
  };

  const handleCertification = () => {
    if (inputCert === sendEmail && inputCert !== "") {
      // 인증번호가 일치할 때
      setModelText("인증이 완료되었습니다.");
      setAble(false);
      setModalOpen(true);
    } else {
      // 인증번호가 일치하지 않을 때
      setModelText("인증에 실패하였습니다.");
      setModalOpen(true);
      console.log(inputTel);
    }
  };

  const changePwd = async (email, newPwd) => {
    try {
      const response = await AxiosApi.changePwd(email, newPwd);
      console.log(email);
      console.log(newPwd);
      console.log(response);
      if (response.data === true) {
        setModelText("비밀번호가 성공적으로 변경되었습니다.");
        setModalOpen(true);
        navigate("/");
      } else {
        setModelText("비밀번호 변경에 실패했습니다.");
        setModalOpen(true);
        navigate("/");
      }
    } catch (error) {
      setModelText("비밀번호 변경에 실패했습니다. 오류가 발생했습니다.");
      setModalOpen(true);
      navigate("/");
    }
  };

  const onChangeId = (e) => {
    setInputId(e.target.value);
  };

  return (
    <CenteredContainer>
      <Box>
        <Container>
          <Logo className="Logo" onClick={() => navigate("/")} />
          <div className="Title">아이디 찾기</div>
          <Item1>
            이름 :{" "}
            <Item2
              placeholder="가입된 실명 입력"
              onChange={onChangeName}
            ></Item2>
          </Item1>
          <Item1>
            전화번호 :{" "}
            <Item2
              placeholder="가입된 전화번호 입력"
              onChange={onChangeTel}
            ></Item2>
          </Item1>
          <Item1 style={{ justifyContent: "center" }}>
            <Button1 onClick={findMemberId}>입력완료</Button1>
          </Item1>
          <div
            style={{
              height: "15px",
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {showFoundId && ( // 아이디 보이게 처리
              <Item1>
                {inputName}님의 아이디(이메일)는{" "}
                <div style={{ color: "red", fontWeight: "bold" }}>
                  {hideEmail(foundId)}
                </div>{" "}
                입니다.
              </Item1>
            )}
          </div>
          <div>
            <div className="Title">비밀번호 변경</div>
          </div>
          <Item1>
            <div style={{ whiteSpace: "nowrap" }}>아이디:</div>
            <div style={{ display: "flex" }}>
              <Item3
                placeholder="아이디(이메일)"
                value={inputId}
                onChange={onChangeId}
              ></Item3>
              <Button2 onClick={() => SingupIdCheck(inputId)}>확인</Button2>
            </div>
          </Item1>
          <Item1>
            <div style={{ whiteSpace: "nowrap" }}>인증번호 입력 : </div>
            <div style={{ display: "flex" }}>
              <Item3
                placeholder="인증번호를 입력해주세요"
                value={inputCert}
                onChange={(e) => setInputCert(e.target.value)}
              ></Item3>
              <Button2 onClick={handleCertification}>인증</Button2>
            </div>
          </Item1>
          <Item1>
            <div style={{ whiteSpace: "nowrap" }}>새 비밀번호 입력 : </div>
            <div style={{ display: "flex" }}>
              <Item3
                disabled={able}
                placeholder="변경할 비밀번호를 입력해주세요"
                onChange={(e) => setChangePw(e.target.value)}
              ></Item3>
              <Button2
                disabled={able}
                onClick={() => changePwd(inputId, changePw)}
              >
                변경
              </Button2>
            </div>
          </Item1>
        </Container>
      </Box>
      <Modal
        type1="0"
        type="1"
        open={modalOpen}
        confirm={closeModal}
        header="메시지"
      >
        {modalText}
      </Modal>
    </CenteredContainer>
  );
};
export default FindIdPwd;
