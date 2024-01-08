import React, { useState } from "react";
import styled from "styled-components";
import { storage } from "./FireBase";
import AxiosApi from "../api/Axios";
import profile from "../img/profile2.png";

const ModalStyle = styled.div`
  .Upload {
      display: flex;
      justify-content: center;
    }

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
    max-width: 700px;
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
    height: 400px;
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

    &:active {
      background-color: #575656;
    }
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
  margin-right: 2rem;
`;

const Exist2 = styled.img`
  width: 220px;
  height: 220px;
  text-justify: center;
  border-radius: 100%;
  margin-bottom: 10px;
  background-image: url(${profile});
  background-position: center;

  @media (max-width: 768px) {
      width: 180px;
      height: 180px;
    }
`;

const FileUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  margin-bottom: 20px;
  width: 100%;
  height: 100px;
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
  width: 220px;
  height: 220px;
  border-radius: 100%;
  background-image: url(${profile});
  background-position: center;
  margin-bottom: 10px;

  @media (max-width: 768px) {
      width: 180px;
      height: 180px;
    }
`;

const Imgmodal = (props) => {
  const { open, close, type, image } = props;
  const [url, setUrl] = useState("");
  const [file, setFile] = useState(null);

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

  const handleUpdate = async () => {
    try {
      await AxiosApi.memberUpdate(url, type);
      alert("회원 정보가 성공적으로 수정되었습니다.");
      close();
      setUrl("");
    } catch (error) {
      console.log(error);
      alert("회원 정보 수정에 실패했습니다.");
      close();
      setUrl("");
      console.log(url);
    }
  };

  const Close = () => {
    setUrl("");
    setFile("");
    close();
  };

  // &times; 는 X표 문자를 의미
  return (
    <ModalStyle>
      <div className={open ? "openModal modal" : "modal"}>
        {open && (
          <section>
            <header>프로필 이미지 변경</header>
            <main
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "row",
              }}
            >
              <div
                className="Box"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "390px",
                }}
              >
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <Exist1>
                    <Exist2 src={image}></Exist2>
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
                  <StyledInput type="file" onChange={handleFileInputChange} />
                  <UploadButton onClick={handleUploadClick}>
                    사진 업로드
                  </UploadButton>
                </FileUploadContainer>
                </div>
              </div>
            </main>
            <footer>
              <button onClick={handleUpdate}>수정</button>
              <button onClick={Close}>취소</button>
            </footer>
          </section>
        )}
      </div>
    </ModalStyle>
  );
};

export default Imgmodal;
