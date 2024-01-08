import React, { useState } from "react";
import styled from "styled-components";
import AxiosApi from "../api/Axios";

const ModalStyle = styled.div`
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
    max-width: 450px;
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
    color: white;
    font-weight: 700;
  }

  section > header button {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 30px;
    font-size: 21px;
    font-weight: 700;
    text-align: center;
    color: white;
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
  }
  section > footer button:active {
    background-color: #686868;
    // 다른 스타일도 필요하다면 추가
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

const Item1 = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px;
  font-size: 13px;
`;

const Item3 = styled.input`
  border-radius: 8px;
  width: 15vw;
  height: 4vh;
  min-width: 200px;
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

const Pwdmodal = (props) => {
  const { open, close, detail } = props;

      const [sendEmail, setSendEmail] = useState("");
      const [inputCert, setInputCert] = useState("");
      const [changePw, setChangePw] = useState("");
      const [able, setAble] = useState(true);

  const Close = () => {
        close();
        setInputCert("");
        setChangePw("");
      };

      const SingupIdCheck = async (detail) => {
        const resp = await AxiosApi.SingupIdCheck(detail);
        console.log("가입 가능 여부 확인 : ", resp.data);
        if (resp.data === false) {
          const response = await AxiosApi.EmailCert(detail);
          if (response.status === 200) {
            alert("인증번호가 발송되었습니다. 이메일을 확인해주세요");
            setSendEmail(response.data);
          } else {
            alert("이메일 전송에 실패했습니다.");
          }
        } else {
          alert("존재하지 않는 이메일입니다.");
        }
      };

    const handleCertification = () => {
        if (inputCert === sendEmail && inputCert !== "") {
          // 인증번호가 일치할 때
          alert("인증이 완료되었습니다.");
          setAble(false);
        } else {
          // 인증번호가 일치하지 않을 때
          alert("인증에 실패하였습니다.");
        }
      };

      const changePwd = async (detail, newPwd) => {
        try {
          const response = await AxiosApi.changePwd(detail, newPwd);
          console.log(newPwd);
          console.log(response);
          if (response.data === true) {
            alert("비밀번호가 성공적으로 변경되었습니다.");
            Close();
          } else {
            alert("비밀번호 변경에 실패했습니다.");
            Close();
          }
        } catch (error) {
          alert("비밀번호 변경에 실패했습니다. 오류가 발생했습니다.");
          Close();
        }
      };


  // &times; 는 X표 문자를 의미
  return (
    <ModalStyle>
       <div className={open ? "openModal modal" : "modal"}>
                  {open && (
                    <section>
                      <header>비밀번호 변경</header>
                      <main
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          flexDirection: "column",
                        }}
                      >
                        <Item1>
                          <div style={{ whiteSpace: "nowrap" }}>아이디:</div>
                          <div style={{ display: "flex" }}>
                            <Item3
                              placeholder="아이디(이메일)"
                              value={detail}
                              readOnly
                            ></Item3>
                            <Button2 onClick={() => SingupIdCheck(detail)}>확인</Button2>
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
                              onClick={() => changePwd(detail, changePw)}
                            >
                              변경
                            </Button2>
                          </div>
                        </Item1>
                      </main>
                      <footer>
                        <button onClick={Close}>취소</button>
                      </footer>
                    </section>
                  )}
                </div>
              </ModalStyle>
  );
};

export default Pwdmodal;
