import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import dogfoot from "../img/dogfoot.png";
import { storage } from "./FireBase";
import AxiosApi from "../api/Axios";
import petprofile from "../img/petprofile2.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import { subDays, subYears } from "date-fns";
import upArrowImage from "../img/up-arrow.png";
import downArrowImage from "../img/down-arrow.png";

const ModalStyle = styled.div`
  .Box {
      display: flex;

      @media (max-width: 1280px) {
        flex-direction: column;
      }
    }

    .Upload {
      display: flex;
      justify-content: center;
    }

    .Main {
      overflow-y: auto;
      max-height: 380px;
      overflow-x: hidden;

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
    }

  /* 모달 기본 스타일 */
  .modal {
    display: none; // 초기에는 숨김
    position: fixed; // 스크롤에 따라 움직이지 않음
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99; // 다른 모달보다 위에 위치
    background-color: rgba(0, 0, 0, 0.6); // 배경색 및 투명도 조절
    // 테두리 추가
  }

  /* 모달이 열릴 때의 스타일 */
  .openModal {
    display: flex; // 모달이 보이도록 함
    align-items: center;
    animation: modal-bg-show 0.8s; // 배경이 스르륵 열리는 효과
    // 테두리 추가
  }

  /* 닫기 버튼 스타일 */
  button {
    outline: none;
    cursor: pointer;
    margin-right: 10px;
    border: 0;
    // 테두리 추가
  }

  /* 모달 컨텐츠 스타일 */
  section {
    width: 90%;
    max-width: 1000px;
    margin: 0 auto;
    border-radius: 0.3rem;
    background-color: white;
    animation: modal-show 0.3s; // 모달이 스르륵 열리는 효과
    overflow: hidden;
    // 테두리 추가
  }

  /* 모달 헤더 스타일 */
  section > header {
    position: relative;
    padding: 16px 64px 16px 16px;
    background-color: #333333;
    color: white;
    font-weight: 700;
    // 테두리 추가
  }

  /* 모달 닫기 버튼 스타일 */
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
    // 테두리 추가
  }

  /* 모달 내용 스타일 */
  section > main {
    padding: 16px;
    border-bottom: 1px solid #dee2e6;
    border-top: 1px solid #dee2e6;
    height: 380px;
    // 테두리 추가
  }

  /* 모달 푸터 스타일 */
  section > footer {
    padding: 12px 16px;
    text-align: right;
    // 테두리 추가
  }

  /* 모달 버튼 스타일 */
  section > footer button {
    padding: 6px 12px;
    color: #fff;
    background-color: #333333;
    border-radius: 5px;
    font-size: 13px;
    // 테두리 추가

    &:active {
      background-color: #575656;
    }
  }

  /* 모달 열릴 때의 애니메이션 효과 */
  @keyframes modal-show {
    from {
      opacity: 0;
      margin-top: -50px;
      // 테두리 추가
    }
    to {
      opacity: 1;
      margin-top: 0;
      // 테두리 추가
    }
  }

  /* 모달 배경 열릴 때의 애니메이션 효과 */
  @keyframes modal-bg-show {
    from {
      opacity: 0;
      // 테두리 추가
    }
    to {
      opacity: 1;
      // 테두리 추가
    }
  }
`;

const PetInfo1 = styled.div`
  position: relative;
  width: 410px;
  height: 200px;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 10px;
  z-index: 1;

  .DogFootImage {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const PetProfile = styled.img`
  width: 200px;
  height: 200px;
  margin-right: 10px;
  border-radius: 100%;
  margin-left: 10px;
  margin-bottom: 10px;
  background-image: url(${petprofile});
  background-position: center;

  @media (max-width: 768px) {
      width: 160px;
      height: 160px;
    }
`;

const PetInfo2 = styled.div`
  z-index: 1;
  display: flex;
    flex-direction: column;
    margin-left: 1rem;
`;

const PetInfo3 = styled.div`
  display: flex;
  justify-content: space-between;
  width: 400px;
  align-items: center;
  padding: 7px 0px 5px 7px;
  white-space: nowrap;

    @media (max-width: 768px) {
      width: 360px;
    }

  .Calender {
      width: 300px;
      height: 27px;
    }

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
`;

const PetSign = styled.input`
  width: 300px;
  height: 27px;
`;

const Change1 = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const Exist1 = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 1rem;
  margin-right: 1rem;
`;

const Exist2 = styled.img`
  width: 200px;
  height: 200px;
  text-justify: center;
  border-radius: 100%;
  margin-bottom: 10px;
`;

const FileUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  margin-bottom: 20px;
  height: 100px;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
      width: 300px;
    }
`;

const StyledInput = styled.input`
  width: 100%; // 너비를 100%로 설정하여 컨테이너의 너비에 맞춤
  padding: 1.5rem 1.5rem;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 15px;
  box-sizing: border-box;
`;

const UploadButton = styled.button`
  width: 90px;
  height: 22px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: bold;
  color: white;
  background-color: #333333;
  box-sizing: border-box;
  vertical-align: bottom;
  margin-left: 5px;
  margin-top: 10px;

  &:active {
    background-color: #575656;
  }
`;

const ImgBox = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 100%;
  margin-bottom: 10px;
  background-image: url(${petprofile});
  background-position: center;

  @media (max-width: 768px) {
      width: 160px;
      height: 160px;
    }
`;

const Petmodal = (props) => {
  const { open, type, close, name, gender, age, breed, img, sign, Type, id } =
    props;
  const [url, setUrl] = useState("");
  const [file, setFile] = useState(null);
  const [inputName, setInputName] = useState("");
  const [inputGender, setInputGender] = useState("");
  const [inputAge, setInputAge] = useState("");
  const [inputType, setInputType] = useState("");
  const [inputBreed, setInputBreed] = useState("");
  const [inputSign, setInputSign] = useState("");
  const [inputBirth, setInputBirth] = useState("");

  const onChangeName = (e) => {
    setInputName(e.target.value);
  };
  const onChangeType = (value) => {
    setInputType(value);
  };
  const onChangeSign = (e) => {
    setInputSign(e.target.value);
  };

  const onChangeBreed = (e) => {
    setInputBreed(e.target.value);
  };

  const handleFileInputChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUploadClick = async () => {
    try {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(file.name);

      // 파일을 업로드하고 기다립니다.
      await fileRef.put(file);
      console.log("File uploaded successfully!");

      // 다운로드 URL을 가져오고 기다립니다.
      const url = await fileRef.getDownloadURL();
      console.log("저장경로 확인 : " + url);

      // 상태를 업데이트합니다.
      setUrl(url);
    } catch (error) {
      // 에러를 처리합니다.
      console.error("Upload failed", error);
    }
  };

  const handleGenderChange = (e) => {
        setInputGender(e.target.value);
      };

  const Close = () => {
    setFile("");
    setInputAge("");
    setInputName("");
    setInputBreed("");
    setInputGender("");
    setInputSign("");
    setInputType("");
    setUrl("");
    close();
  };

  const navigate = useNavigate();

  const petUpload = async () => {
  if (
        !inputName ||
        !inputGender ||
        !inputType ||
        !inputBreed ||
        !inputAge ||
        !inputSign ||
        !inputType
      ) {
        alert("모든 항목을 입력해주세요.");
        return; // 빈 값이 있을 경우 함수 종료
      } else {
    try {
      const rsp = await AxiosApi.petReg(
        inputName,
        inputGender,
        inputType,
        inputBreed,
        inputBirth,
        url,
        inputSign
      );
      if (rsp.data === true) {
        alert("등록 성공");
        navigate("/mypage");
        setUrl("");
        close();
      } else {
        alert("등록 실패");
        console.log(rsp);
      }
    } catch (error) {
      console.log(error);
    }
    }
  };

  const petUpdate = async () => {
  if (
        !inputName ||
        !inputGender ||
        !inputType ||
        !inputBreed ||
        !inputAge ||
        !inputSign ||
        !inputType
      ) {
        alert("모든 항목을 입력해주세요.");
        return; // 빈 값이 있을 경우 함수 종료
      } else {
    try {
      const rsp = await AxiosApi.petUpdate(
        id,
        inputName,
        inputGender,
        inputType,
        inputBreed,
        inputBirth,
        url,
        inputSign
      );
      if (rsp.data === true) {
        alert("수정 성공");
        navigate("/mypage");
        setUrl("");
        close();
      } else {
        alert("수정 실패");
        console.log(rsp);
      }
    } catch (error) {
      console.log(error);
    }
    }
  };

  const formatDate = (date) => {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const onChangeBirth = (date) => {
      if (date) {
        const formattedDate = formatDate(date);
        setInputAge(date);
        setInputBirth(formattedDate);
      } else {
        setInputAge("");
      }
    };

  useEffect(() => {
    console.log(Type);
    if (open) {
      setInputName(name || "");
      setInputGender(gender || "");
      setInputAge(age ? new Date(age) : "");
      setInputBreed(breed || "");
      setInputType(Type || "");
      setInputSign(sign || "");
    }
  }, [open, name, gender, age, breed, Type, sign, img]);

  const maxSelectableDate = subDays(new Date(), 1);

  // &times; 는 X표 문자를 의미
  return (
    <ModalStyle>
      <div className={open ? "openModal modal" : "modal"}>
        {open && (
          <section>
            <header style={{ display: "flex" }}>
              반려동물 정보{" "}
              {type && type === 1 ? <div> 추가</div> : <div> 수정</div>}
            </header>
            <main
                          className="Main"
                          style={{
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <div className="Box">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginRight: "20px",
                }}
              >
                <div
                    style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    }}
                >
                  <Exist1>
                    <PetProfile src={img}></PetProfile>
                    <div style={{ textAlign: "center", fontSize: "18px" }}>
                      현재 프로필
                    </div>
                  </Exist1>
                  <Change1>
                    <ImgBox>{url && <Exist2 src={url} />}</ImgBox>
                    <div style={{ textAlign: "center", fontSize: "18px" }}>
                      수정 프로필
                    </div>
                  </Change1>
                </div>
                <div className="Upload">
                <FileUploadContainer>
                  <StyledInput
                                          type="file"
                                          onChange={handleFileInputChange}
                                        />
                  <UploadButton onClick={handleUploadClick}>
                    사진 업로드
                  </UploadButton>
                </FileUploadContainer>
                </div>
              </div>
              <PetInfo1>
                <PetInfo2>
                  <PetInfo3>
                    이름 :{" "}
                                          <PetSign value={inputName} onChange={onChangeName} />
                  </PetInfo3>
                  <PetInfo3>
                    성별 :{" "}
                    <label>
                                                              <input
                                                                type="radio"
                                                                name="gender"
                                                                value="남"
                                                                checked={inputGender === "남"}
                                                                onChange={handleGenderChange}
                                                              />
                                                              남
                                                            </label>
                                                            <label>
                                                              <input
                                                                type="radio"
                                                                name="gender"
                                                                value="여"
                                                                checked={inputGender === "여"}
                                                                onChange={handleGenderChange}
                                                              />
                                                              여
                                                            </label>
                  </PetInfo3>
                  <PetInfo3>
                    생년월일 :{" "}
                    <DatePicker
                                            className="Calender"
                                            selected={inputAge}
                                            locale={ko}
                                            shouldCloseOnSelect
                                            onChange={(date) => onChangeBirth(date)}
                                            showYearDropdown
                                            showMonthDropdown
                                            dateFormat="yyyy년 MM월 dd일"
                                            maxDate={maxSelectableDate}
                                          />
                  </PetInfo3>
                  <PetInfo3>
                    종 :{" "}
                                          <PetSign value={inputBreed} onChange={onChangeBreed} />
                  </PetInfo3>
                  <PetInfo3>
                    특이사항 :{" "}
                    <PetSign value={inputSign} onChange={onChangeSign} />
                  </PetInfo3>
                  <PetInfo3>
                    {" "}
                    <div>종류: </div>
                    <label>
                      <input
                        type="radio"
                        value={1}
                        checked={inputType === 1}
                        onChange={() => onChangeType(1)}
                      />
                      개
                    </label>
                    <label>
                      <input
                        type="radio"
                        value={2}
                        checked={inputType === 2}
                        onChange={() => onChangeType(2)}
                      />
                      고양이
                    </label>
                  </PetInfo3>
                </PetInfo2>
              </PetInfo1>
              </div>
            </main>
            <footer>
              {type && type === 1 ? (
                <button onClick={petUpload}>추가</button>
              ) : (
                <button onClick={petUpdate}>수정</button>
              )}
              <button onClick={Close}>취소</button>
            </footer>
          </section>
        )}
      </div>
    </ModalStyle>
  );
};

export default Petmodal;
