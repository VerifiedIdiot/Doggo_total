import { useEffect, useState } from "react";
import { SideBar } from "../PublicStyle";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { RightBox, PaginationContainer, PageButton } from "../admin/Adminmember";
import AdminAxiosApi from "../../api/AdminAxios";

const QnaBoard = styled.div`
  padding: 10px 20px;

  .textbox {
    overflow: hidden;
    text-overflow: ellipsis;

    p {
      cursor: pointer;
      margin-bottom: 10px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      transition: 0.3s;

      &:hover {
        color: #9c9c9c;
      }
    }
    .bottomTxt {
      color: #776b5d;

      .bar {
        display: inline-block;
        width: 1px;
        height: 14px;
        background-color: #776b5d;
        border: 1px solid #776b5d;
        margin: 0 10px;
      }
    }
  }
`;

const Adminqna = () => {
  const navigate = useNavigate();

  const [qnaAllList, setQnaAllList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지
  const [totalPage, setTotalPage] = useState(0); // 총 페이지 수
  const [filter, setFilter] = useState("all");


  const handleQnaDetail = (id) => {
    navigate(`/ad/qna/${id}`);
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

  useEffect(() => {
    const totalPage = async () => {
      try {
        const res = await AdminAxiosApi.QnaPage(0, 10, filter);
        setTotalPage(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    totalPage();
  }, [filter]);

  useEffect(() => {
    const qnaList = async () => {
      try {
        const res = await AdminAxiosApi.QnaPageList(currentPage, 10, filter);
        console.log(res.data);
        setQnaAllList(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    qnaList();
  }, [currentPage, filter]);

  // 페이지네이션 - 페이지 이동 기능
  const handlePageChange = (number) => {
    console.log(number);
    setCurrentPage(number - 1);
  };

  // 페이지네이션 버튼
  const renderPagination = () => {
    return (
      <PaginationContainer>
        {Array.from({ length: totalPage }, (_, i) => i + 1).map((page) => (
          <PageButton key={page} onClick={() => handlePageChange(page)}>
            {page}
          </PageButton>
        ))}
      </PaginationContainer>
    );
  };
  const filterChange = (e) => {
    setFilter(e)
    setCurrentPage(0);
  }

  return (
    <>
      <SideBar>
        <RightBox>
          <h1> 1:1 문의 관리</h1>
          <div className="selectBox">
            <label>
              <input
                type="radio"
                value="all"
                checked={filter === "all"}
                onChange={() => filterChange("all")}
              />
              전체문의
            </label>
            <label>
              <input
                type="radio"
                value="unanswered"
                checked={filter === "unanswered"}
                onChange={() => filterChange("unanswered")}
              />
              답변 대기
            </label>
            <label>
              <input
                type="radio"
                value="answered"
                checked={filter === "answered"}
                onChange={() => filterChange("answered")}
              />
              답변 완료
            </label>
          </div>

          <QnaBoard>
            {qnaAllList.map((item, index) => (
              <div key={index} className="flexbox">
                <span>{index + 1}</span>
                <div className="textbox">
                  <p onClick={() => handleQnaDetail(item.boardId)}>
                    [{item.boardType}] <span className="bar"></span>
                    {item.comment}
                  </p>
                  <div className="bottomTxt">
                    <span>{item.memberEmail}</span>
                    <span className="bar"></span>
                    <span>{formatDate(item.regDate)}</span>
                    <span className="bar"></span>
                    <span>{item.answer ? "답변 완료" : "답변 대기"}</span>
                  </div>
                </div>
              </div>
            ))}
          </QnaBoard>
          {renderPagination()}
        </RightBox>
      </SideBar>
    </>
  );
};

export default Adminqna;