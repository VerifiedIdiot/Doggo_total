import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Modal from "../../utill/Modal";
import AxiosApi from "../../api/Axios";
import PopupDom from "../../components/member/PopupDom";
import PopupPostCode from "../../components/member/PopupPostCode";
import { ReactComponent as Logo } from "../../icon/petmemori.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import { subDays, subYears } from "date-fns";
import upArrowImage from "../../img/up-arrow.png";
import downArrowImage from "../../img/down-arrow.png";
import { PayContext } from "../../context/Paystore";

const Container = styled.div`
  width: 500px;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
  justify-content: center; /* 수직으로 가운데 정렬 */
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);
  height: 100%;

  @media (max-width: 1280px) {
    width: 450px;
  }

  .Logo {
    width: 200px;
    margin-top: 2rem;
    cursor: pointer;
    flex-shrink: 0;
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
`;
const Hint = styled.div`
  width: 60%;
  height: 5px;
  text-align: right;
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: end;
`;

const Items = styled.div`
  .react-datepicker__navigation--years-upcoming {
    top: 0%;
    background-image: url(${upArrowImage});
    background-size: contain; /* 이미지 크기 설정 */
    background-repeat: no-repeat; /* 이미지 반복 설정 */
    background-position: center; /* 이미지를 가운데 정렬 */
    background-size: 70%;
    cursor: pointer;
  }

  .react-datepicker__navigation--years-previous {
    top: 0%;
    background-image: url(${downArrowImage});
    background-size: contain; /* 이미지 크기 설정 */
    background-repeat: no-repeat; /* 이미지 반복 설정 */
    background-position: center; /* 이미지를 가운데 정렬 */
    cursor: pointer;
    background-size: 70%;
  }

  .Calender {
    width: 300px;
    height: auto; /* 높이값 초기화 */
    line-height: normal; /* line-height 초기화 */
    padding: 0.8em 0.5em; /* 원하는 여백 설정, 상하단 여백으로 높이를 조절 */
    font-family: inherit; /* 폰트 상속 */
    border: 1px solid #999;
    border-radius: 5px; /* iSO 둥근모서리 제거 */
    outline-style: none; /* 포커스시 발생하는 효과 제거를 원한다면 */

    @media (max-width: 1280px) {
      width: 270px;
    }
  }

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
    color: red;
    font-size: 14px;
    display: flex;
  }
  &.hint {
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
`;

const Input = styled.input`
  width: 100%; /* 원하는 너비 설정 */
  height: auto; /* 높이값 초기화 */
  line-height: normal; /* line-height 초기화 */
  padding: 0.8em 0.5em; /* 원하는 여백 설정, 상하단 여백으로 높이를 조절 */
  font-family: inherit; /* 폰트 상속 */
  border: 1px solid #999;
  border-radius: 5px; /* iSO 둥근모서리 제거 */
  outline-style: none; /* 포커스시 발생하는 효과 제거를 원한다면 */
`;

const Input2 = styled.input`
  width: 80%; /* 원하는 너비 설정 */
  height: auto; /* 높이값 초기화 */
  line-height: normal; /* line-height 초기화 */
  padding: 0.8em 0.5em; /* 원하는 여백 설정, 상하단 여백으로 높이를 조절 */
  font-family: inherit; /* 폰트 상속 */
  border: 1px solid #999;
  border-radius: 5px 0px 0px 5px; /* iSO 둥근모서리 제거 */
  outline-style: none; /* 포커스시 발생하는 효과 제거를 원한다면 */
`;

const Button1 = styled.button`
  margin-top: 10px;
  margin-left: 30px;
  margin-right: 30px;
  font-family: "Noto Sans KR", sans-serif;
  width: 60%; /* 원하는 너비 설정 */
  height: 55px;
  color: white;
  background-color: #333333;
  font-size: 20px;
  font-weight: 500;
  border-radius: 5px;
  font-weight: 700;
  border: none;
  white-space: nowrap;
  cursor: pointer;
  flex-shrink: 0;
  font-family: inherit; /* 폰트 상속 */

  opacity: ${(props) =>
    props.disabled ? "0.7" : "1"}; // 비활성화 상태일 때 투명도 설정

  &:active {
    //확인 클릭하면 설정
    border: #999;
    font-weight: 700;
    background-color: #5c5b5b;
  }

  &:disabled {
    opacity: 0.6; /* 비활성화 상태일 때 투명도를 조절하여 흐려지도록 함 */
    cursor: not-allowed; /* 마우스 커서를 바꾸어 사용 불가 상태를 나타냄 */
  }
`;

const Button2 = styled.button`
  font-family: "Noto Sans KR", sans-serif;
  color: white;
  background-color: #333333;
  font-size: 13px;
  width: 20%;
  font-weight: 400;
  border-radius: 0px 5px 5px 0px;
  border: none;
  cursor: pointer;
  font-family: inherit; /* 폰트 상속 */

  opacity: ${(props) =>
    props.disabled ? "0.7" : "1"}; // 비활성화 상태일 때 투명도 설정

  &:active {
    background-color: #5c5b5b;
  }
`;

const Button3 = styled.button`
  width: 100%;
  height: auto; /* 높이값 초기화 */
  line-height: normal; /* line-height 초기화 */
  padding: 0.8em 0.5em; /* 원하는 여백 설정, 상하단 여백으로 높이를 조절 */
  font-family: inherit; /* 폰트 상속 */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #333333;
  color: white;
  opacity: ${(props) =>
    props.disabled ? "0.7" : "1"}; // 비활성화 상태일 때 투명도 설정

  &:active {
    background-color: #5c5b5b;
  }
`;

const Box = styled.div`
  width: 40vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const CenteredContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RadioContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%; /* 원하는 너비 설정 */
  line-height: normal; /* line-height 초기화 */
  padding: 0.7em 0.5em; /* 원하는 여백 설정, 상하단 여백으로 높이를 조절 */
  border-radius: 5px; /* iSO 둥근모서리 제거 */
  border: 1px solid rgb(153, 153, 153);
`;

const Radio = styled.div`
  display: flex;
  align-items: center;

  .radio {
        cursor: pointer;
      }

      input[type="radio"] {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        width: 12px;
        height: 12px;
        border: 2px solid #ccc; // 체크되지 않았을 때의 테두리 색상
        border-radius: 50%;
        outline: none; // focus 시에 나타나는 기본 스타일 제거
        cursor: pointer;
      }

      // 체크될 시에, 변화되는 스타일 설정
      input[type="radio"]:checked {
        background-color: #f95001;
        border: 3px solid white;
        box-shadow: 0 0 0 1.6px #f95001;
      }
`;

const Label = styled.label`
  margin-left: 5px;
  cursor: pointer;
`;

const SignUp = () => {
  const navigate = useNavigate();

  // 키보드 입력
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");
  const [inputTel, setInputTel] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputBirth, setInputBirth] = useState("");
  const [inputGender, setInputGender] = useState("");
  const [postNum, setPostNum] = useState("");
  const [post, setPost] = useState("");
  const [postDetail, setPostDetail] = useState("");
  const [inputDate, setInputDate] = useState();

  // 오류 메시지
  const [idMessage, setIdMessage] = useState("");
  const [pwMessage, setPwMessage] = useState("");
  const [pwConfirmMessage, setPwConfirmMessage] = useState("");

  // 유효성 검사
  const [isId, setIsId] = useState("");
  const [isPw, setIsPw] = useState("");
  const [isName, setIsName] = useState("");
  const [isTel, setIsTel] = useState("");
  const [isBirth, setIsBirth] = useState("");
  const [isPostNum, setIsPostNum] = useState("");
  const [isPost, setIsPost] = useState("");
  const [isGender, setIsGender] = useState("");
  const [isPwConfirm, setIsPwConfirm] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // 이메일 인증
  const [sendEmail, setSendEmail] = useState("");
  const [inputCert, setInputCert] = useState("");

  // 인증 후 활성화
  const [able, setAble] = useState(false);
  const [btnAble, setBtnAble] = useState(true);

  //팝업 처리
  const [modalOpen, setModalOpen] = useState(false);
  const [modalText, setModelText] = useState("중복된 아이디 입니다.");

  // 약관 동의
  const [allCheck, setAllCheck] = useState(false);
  const [ageCheck, setAgeCheck] = useState(false);
  const [useCheck, setUseCheck] = useState(false);
  const [marketingCheck, setMarketingCheck] = useState(false);

  // 카카오 아이디, 비밀번호
  const context = useContext(PayContext);
  const { kakaoId, kakaoPw, setKakaoId, setKakaoPw } = context;

  // 카카오 회원가입 시, 아이디, 비밀번호 input 비활성화
  const [readOnly, setReadOnly] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
  };

  const openPostCode = () => {
    setIsPopupOpen(true);
  };

  // 팝업창 닫기
  const closePostCode = () => {
    setIsPopupOpen(false);
  };

  // 5~ 20자리의 영문자, 숫자, 언더스코어(_)로 이루어진 문자열이 유효한 아이디 형식인지 검사하는 정규표현식
  const onChangeId = (e) => {
    const regexId = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    setInputId(e.target.value);
    if (!regexId.test(e.target.value)) {
      setIdMessage("이메일 형식으로 입력해주세요 (example@email.com)");
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

  const onChangePwConfirm = (e) => {
    const confirmPassword = e.target.value;
    setPwConfirm(confirmPassword);

    if (confirmPassword === inputPw) {
      setPwConfirmMessage("패스워드가 일치합니다.");
      setIsPwConfirm(true);
    } else {
      setPwConfirmMessage("패스워드가 일치하지 않습니다.");
      setIsPwConfirm(false);
    }
  };

  const onChangeName = (e) => {
    const Name = e.target.value;
    setInputName(Name);
    setIsName(Name !== "" && Name !== undefined);
  };

  const onChangeTel = (e) => {
    const input = e.target.value;
    const telWithoutHyphen = input.replace(/[^0-9]/g, ""); // 숫자만 남기고 나머지 문자 제거
    setInputTel(telWithoutHyphen);
    setIsTel(telWithoutHyphen !== "" && telWithoutHyphen !== undefined);
  };

  const SingupIdCheck = async (email) => {
    if (!isId) {
            setModelText("입력된 이메일을 다시 확인해주세요.");
            setModalOpen(true);
            return;
          }

    const resp = await AxiosApi.SingupIdCheck(email);
    console.log("가입 가능 여부 확인 : ", resp.data);
    if (resp.data === true) {
      setModelText("사용 가능한 이메일 입니다.");
      setModalOpen(true);
      setBtnAble(false);
    } else {
      setModelText("중복된 이메일 입니다.");
      setModalOpen(true);
    }
  };

  const SendEmail = async (email) => {
    if (!isId) {
            setModelText("입력한 이메일을 다시 확인해주세요.");
            setModalOpen(true);
            return;
          }

    const response = await AxiosApi.EmailCert(email);
    if (response.status === 200) {
      setModelText("인증번호가 발송되었습니다. 이메일을 확인해주세요");
      setModalOpen(true);
      setSendEmail(response.data);
      setBtnAble(true);
    } else {
      setModelText("이메일 전송에 실패했습니다.");
    }

    setTimeout(() => {
            setBtnAble(false);
          }, 120000);
  };

  const handleCertification = () => {
    if (inputCert === sendEmail && inputCert !== "") {
      // 인증번호가 일치할 때
      setModelText("인증이 완료되었습니다.");
      setModalOpen(true);
    } else {
      // 인증번호가 일치하지 않을 때
      setModelText("인증에 실패하였습니다.");
      setModalOpen(true);
      console.log(inputTel);
    }
  };

  const onClickSignUp = async () => {
    if (!ageCheck || !useCheck) {
      setModalOpen(true);
      setModelText("필수 약관을 동의해주세요.");
      return;
    }
    if (
      isId &&
      isPw &&
      isPwConfirm &&
      isName &&
      isTel &&
      isPost &&
      isPostNum &&
      isBirth &&
      isGender
    ) {
      try {
        const fullAddress = `${post} ${postDetail} ${postNum}`;
        const isLogin = await AxiosApi.Signup(
          inputId,
          inputPw,
          inputTel,
          inputName,
          fullAddress,
          inputBirth,
          inputGender
        );
        setModalOpen(true);
        console.log("회원가입 성공 ", isLogin);
        alert("회원가입에 성공하였습니다.");
        navigate("/login");
      } catch (e) {
        console.log("회원가입 실패", e);
      }
    } else {
      setModalOpen(true);
      setModelText("필수정보를 모두 입력해주세요");
    }
  };

  const onPostNum = (num) => {
    setPostNum(num);
    setIsPostNum(num !== "" && num !== undefined);
  };

  const onPost = (post) => {
    setPost(post);
    setIsPost(post !== "" && post !== undefined);
  };

  const handleGenderChange = (e) => {
    setInputGender(e.target.value);
    setIsGender(e.target.value !== "" && e.target.value !== undefined);
  };

  const allBtnEvent = () => {
    if (allCheck === false) {
      setAllCheck(true);
      setAgeCheck(true);
      setUseCheck(true);
      setMarketingCheck(true);
    } else {
      setAllCheck(false);
      setAgeCheck(false);
      setUseCheck(false);
      setMarketingCheck(false);
    }
  };

  const ageBtnEvent = () => {
    if (ageCheck === false) {
      setAgeCheck(true);
    } else {
      setAgeCheck(false);
    }
  };

  const useBtnEvent = () => {
    if (useCheck === false) {
      setUseCheck(true);
    } else {
      setUseCheck(false);
    }
  };

  const marketingBtnEvent = () => {
    if (marketingCheck === false) {
      setMarketingCheck(true);
    } else {
      setMarketingCheck(false);
    }
  };

  useEffect(() => {
    if (ageCheck === true && useCheck === true && marketingCheck === true) {
      setAllCheck(true);
    } else {
      setAllCheck(false);
    }
    if (kakaoId !== "" && kakaoPw !== "") {
        setInputId(kakaoId);
        setInputPw(kakaoPw);
        setPwConfirm(kakaoPw);
        setAble(true);
        setBtnAble(true);
        setReadOnly(true);
        setIsId(true);
        setIsPw(true);
        setIsPwConfirm(true);
        }
  }, [ageCheck, useCheck, marketingCheck]);

  useEffect(() => {
      return () => {
        setKakaoId("");
        setKakaoPw("");
      };
    }, []);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const onChangeBirth = (date) => {
    if (date) {
      const formattedDate = formatDate(date);
      setInputDate(date);
      setInputBirth(formattedDate);
      setIsBirth(date !== "" && date !== undefined);
    } else {
      setInputBirth("");
    }
  };

  const handleTextClick = (value) => {
        // inputGender 상태 업데이트 또는 다른 필요한 로직 수행
        setInputGender(value);
      };

  const maxSelectableDate = subDays(new Date(), 1);

  return (
    <CenteredContainer>
      <Box>
        <Container>
          <Logo className="Logo" onClick={() => navigate("/")} />
          <Items className="login" style={{ marginTop: "20px" }}>
            <span>회원가입</span>
          </Items>
          <Items className="item2" style={{ display: "flex" }}>
            <Input2
              placeholder="아이디(이메일)"
              value={inputId}
              onChange={onChangeId}
              readOnly={readOnly}
            />
            <Button2 onClick={() => SingupIdCheck(inputId)} disabled={able}>
                중복체크
            </Button2>
          </Items>
          <Hint>
            {inputId.length > 0 && (
              <span className={`${isId ? "success" : "error"}`}>
                {idMessage}
              </span>
            )}
          </Hint>
          <Items className="item2" style={{ display: "flex" }}>
            <Button3 onClick={() => SendEmail(inputId)} disabled={btnAble}>
              인증번호 발송
            </Button3>
          </Items>
          <Items className="item2" style={{ display: "flex" }}>
            <Input2
              placeholder="인증번호를 입력해주세요"
              value={inputCert}
              onChange={(e) => setInputCert(e.target.value)}
              readOnly={readOnly}
            />
            <Button2 onClick={handleCertification} disabled={able}>
              인증
            </Button2>
          </Items>
          <div style={{ height: "2%" }}></div>
          <Items className="item2">
            <Input
              type="password"
              placeholder="패스워드"
              value={inputPw}
              onChange={onChangePw}
              readOnly={readOnly}
            />
          </Items>
          <Hint>
            {inputPw.length > 0 && (
              <span className={`${isPw ? "success" : "error"}`}>
                {pwMessage}
              </span>
            )}
          </Hint>
          <Items className="item2">
            <Input
              type="password"
              placeholder="패스워드 확인"
              value={pwConfirm}
              onChange={onChangePwConfirm}
              readOnly={readOnly}
            />
          </Items>
          <Hint>
            {pwConfirm.length > 0 && (
              <span className={`${isPwConfirm ? "success" : "error"}`}>
                {pwConfirmMessage}
              </span>
            )}
          </Hint>

          <Items className="item2">
            <Input
              type="input"
              placeholder="이름"
              value={inputName}
              onChange={onChangeName}
            />
          </Items>
          <div style={{ height: "2%" }}></div>

          <Items className="item2">
            <Input
              type="input"
              placeholder="전화번호 (하이픈(-) 제외, 숫자만 입력)"
              value={inputTel}
              onChange={onChangeTel}
            />
          </Items>
          <div style={{ height: "2%" }}></div>

          <Items className="item2">
            <DatePicker
              placeholderText="생년월일"
              className="Calender"
              selected={inputDate}
              locale={ko}
              shouldCloseOnSelect
              onChange={(date) => onChangeBirth(date)}
              showYearDropdown
              showMonthDropdown
              dateFormat="yyyy년 MM월 dd일"
              maxDate={maxSelectableDate}
            />
          </Items>
          <div style={{ height: "2%" }}></div>

          <Items
            className="item2"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <div style={{ display: "flex", marginBottom: "8px" }}>
              <Input2
                type="input"
                placeholder="주소"
                value={post}
              />
              <Button2 type="button" onClick={openPostCode}>
                주소검색
              </Button2>
            </div>
            <div id="popupDom">
              {isPopupOpen && (
                <PopupDom>
                  <PopupPostCode
                    onPostNum={onPostNum}
                    onPost={onPost}
                    onClose={closePostCode}
                  />
                </PopupDom>
              )}
            </div>
            <div style={{ display: "flex" }}>
              <Input
                type="input"
                placeholder="우편번호"
                value={postNum}
              />
              <Input
                type="input"
                placeholder="상세주소 입력"
                value={postDetail}
                onChange={(e) => setPostDetail(e.target.value)}
              />
            </div>
          </Items>

          <div style={{ height: "2%" }}></div>

          <Items className="item2" style={{ display: "flex" }}>
            <RadioContainer>
              <div>성별 : </div>
              <Radio>
                <input
                  type="radio"
                  name="gender"
                  value="남"
                  checked={inputGender === "남"}
                  onChange={handleGenderChange}
                  className="radio"
                />
                <Label onClick={() => handleTextClick("남")}>남자</Label>
              </Radio>
              <Radio>
                <input
                  type="radio"
                  name="gender"
                  value="여"
                  checked={inputGender === "여"}
                  onChange={handleGenderChange}
                  className="radio"
                />
                <Label onClick={() => handleTextClick("여")}>여자</Label>
              </Radio>
            </RadioContainer>
          </Items>
          <div style={{ height: "2%" }}></div>
          <Items className="item2" style={{ display: "flex" }}>
            <RadioContainer
            className="item2"
            style={{
            marginBottom: "10px",}}
            >
              <Radio>
                <form method="post">
                  <div>
                    <label>약관동의</label>
                    <div>
                      <div>
                        <input
                          type="checkbox"
                          id="all-check"
                          checked={allCheck}
                          onChange={allBtnEvent}
                          style={{ cursor: "pointer" }}
                        />
                        <label for="all-check">전체동의</label>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          id="check1"
                          checked={ageCheck}
                          onChange={ageBtnEvent}
                          style={{ cursor: "pointer" }}
                        />
                        <label for="check1">
                          만 14세 이상입니다 <span>(필수)</span>
                        </label>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          id="check2"
                          checked={useCheck}
                          onChange={useBtnEvent}
                          style={{ cursor: "pointer" }}
                        />
                        <label for="check2">
                          이용약관 <span>(필수)</span>
                        </label>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          id="check3"
                          checked={marketingCheck}
                          onChange={marketingBtnEvent}
                          style={{ cursor: "pointer" }}
                        />
                        <label for="check3">
                          마케팅 동의 <span>(선택)</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </form>
              </Radio>
            </RadioContainer>
          </Items>
          <Button1
            onClick={onClickSignUp}
            style={{ marginBottom: "20px" }}
          >
            회원가입
          </Button1>
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
export default SignUp;
