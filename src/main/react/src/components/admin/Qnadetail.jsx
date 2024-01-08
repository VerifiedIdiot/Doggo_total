import { useParams } from "react-router-dom";
import { SideBar } from "../PublicStyle";
import styled from "styled-components";
import { qnaData } from "./Adminqna";
import { useEffect, useState } from "react";
import { RightBox } from "./Adminmember";
import AdminAxiosApi from "../../api/AdminAxios";

const QnaBoard = styled.div`
  width: 100%;
  border: 1px solid #2d2d2d;
  border-radius: 10px;
  padding: 0px 20px 20px;

  .textbox {
    overflow: hidden;
    text-overflow: ellipsis;

    p {
      margin-bottom: 10px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .bottomTxt {
      color: #999999;

      .bar {
        display: inline-block;
        width: 1px;
        height: 14px;
        background-color: #999999;
        border: 1px solid #999999;
        margin: 0 10px;
      }
    }
  }
  .QuestionDetail {
    padding: 20px 10px;
    overflow-wrap: anywhere;
    border-bottom: 1px solid #999999;
    overflow: hidden;

    & > div {
      margin: 20px auto;
      text-align: center;

      & > img {
        width: 70%;
        max-width: 540px;
        min-width: 180px;
      }
    }
  }
  .answerBox {
    position: relative;
    padding-bottom: 40px;

    .uploadedAnswer {
      white-space: normal;
      overflow-wrap: anywhere;
      padding: 20px 10px;
      p:nth-child(1) {
        margin-bottom: 10px;
      }
    }
    textarea {
      width: 100%;
      padding: 10px 10px;
      margin-bottom: 10px;
      border: none;
      outline: none;
      resize: none;
      border: 1px solid #999999;
      border-radius: 5px;
    }
    button {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;

      background-color: #2d2d2d;
      color: #fff;
      padding: 8px 12px;
      border-radius: 5px;
      border-style: none;
      box-shadow: 3px 2px 4px 1px #d9d9d9;
      cursor: pointer;

      position: absolute;
      bottom: 0px;
      right: 0px;
    }
  }
`;

const Qnadetail = () => {
  // id로 해당 문의의 상세정보를 가져옴
  const { id } = useParams();
  const [detailQna, setDetailQna] = useState([]);
  const [answer, setAnswer] = useState("");
  const [isTrue, setIsTrue] = useState(false);
  const [uploadedAnswer, setUploadedAnswer] = useState(answer);

  const Click = () => {
    setIsTrue((prev) => !prev);
  };
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "ko-KR",
      options
    );
    return formattedDate;
  };

  // QnaDetail data가져오기
  useEffect(() => {
    const getDetailQna = async () => {
      try {
        const res = await AdminAxiosApi.QnaDetail(id);
        console.log(res);
        console.log(res.data);
        setDetailQna(res.data);
        Click();
      } catch (error) {
        console.log(error);
      }
    };
    getDetailQna();
  }, [id, isTrue]);

  // 답변 업로드
  const uploadAnswer = async () => {
    try {
      console.log("답변 : " + answer, "아이디 : " + id);
      const res = await AdminAxiosApi.AnswerChange(id, answer);

      if (res.data === true) {
        const res = await AdminAxiosApi.QnaDetail(id);
        console.log(res);
        console.log(res.data);

        setAnswer(""); // 업로드시, textarea초기화
      }
    } catch (e) {
      console.error(e);
      alert("에러 발생");
    }
  };

  return (
    <>
      <SideBar>
        <RightBox>
          <h1>1:1 문의</h1>
          <QnaBoard>
            <div className="flexbox">
              <div className="textbox">
                <p>
                  [{detailQna.boardType}] <span className="bar"></span>{" "}
                  {detailQna.comment}
                </p>
                <div className="bottomTxt">
                  <span>{detailQna.memberEmail}</span>
                  <span className="bar"></span>
                  <span>{formatDate(detailQna.regDate)}</span>
                </div>
              </div>
            </div>
            <div className="QuestionDetail">
              <p>{detailQna.comment}</p>
              <div><img src={detailQna.boardImg} alt="문의이미지" /></div>
            </div>
            <div className="answerBox">
              <div className="uploadedAnswer">
                <p>관리자의 답변 : </p>
                <pre>{detailQna.answer}</pre>
              </div>
              <textarea
                placeholder="답변을 입력하세요."
                value={answer}
                cols="100"
                rows="5"
                onChange={(e) => setAnswer(e.target.value)}
              ></textarea>
              <button onClick={uploadAnswer}>
                {detailQna.answer ? "답변 수정" : "답변 작성"}
              </button>
            </div>
          </QnaBoard>
        </RightBox>
      </SideBar>
    </>
  );
};

export default Qnadetail;
