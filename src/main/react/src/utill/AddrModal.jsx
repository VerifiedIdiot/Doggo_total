import React, { useState } from "react";
import styled from "styled-components";
import PopupPostCode from "../components/member/PopupPostCode";
import PopupDom from "../components/member/PopupDom";
import AxiosApi from "../api/Axios";

const PostBox = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  .inputBox {
    width: 50%;
  }
  .inputBox1 {
    width: 100%;
  }
`;

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
    font-weight: 700;
    color: #dee2e6;
  }

  section > header button {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 30px;
    font-size: 21px;
    font-weight: 700;
    text-align: center;
    color: #dee2e6;
    background-color: transparent;
  }
  section > main {
    display: flex;
    align-items: center;
    justify-content: center;
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
    background-color: #45474b;
    border-radius: 5px;
    font-size: 13px;
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

const AddrModal = (props) => {
  const { open, saleNum, close, type1 } = props;
  const [postDetail, setPostDetail] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [postNum, setPostNum] = useState("");
  const [post, setPost] = useState("");
  // &times; 는 X표 문자를 의미
  const openPostCode = () => {
    setIsPopupOpen(true);
  };
  const closePostCode = () => {
    setIsPopupOpen(false);
  };
  const onPost = (post) => {
    setPost(post);
  };
  const onPostNum = (num) => {
    setPostNum(num);
  };

  const SalesModify = async () => {
    const fullAddr = post + postDetail + postNum;
    const resp = await AxiosApi.SaleModify(saleNum,fullAddr);
    if (resp.data === true) {
      alert("변경확인");
      close();
    } else {
      alert("변경실패");
    }
  };

  return (
    <ModalStyle>
      <div className={open ? "openModal modal" : "modal"}>
        {open && (
          <section>
            <header>
              주소 변경
              <button onClick={close}>&times;</button>
            </header>
            <main>
            <PostBox>
              <div style={{marginBottom:"5%", fontSize:"1.2em"}}>변경하실 주소를 입력해주세요.</div>
              <div>
                <input
                  className="inputBox1"
                  type="input"
                  placeholder="주소"
                  value={post}
                  onClick={openPostCode}
                />
                <div>
                  <input
                    className="inputBox"
                    type="input"
                    placeholder="우편번호"
                    value={postNum}
                  />
                  <input
                    className="inputBox"
                    type="input"
                    placeholder="상세주소 입력"
                    value={postDetail}
                    onChange={(e) => setPostDetail(e.target.value)}
                  />
                </div>
              </div>
            </PostBox>
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

            </main>
            <footer>
              <button onClick={SalesModify}>변경</button>
              {type1 !== "0" ? <button onClick={close}>취소</button> : <></>}
            </footer>
          </section>
        )}
      </div>
    </ModalStyle>
  );
};

export default AddrModal;
