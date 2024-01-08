import styled from "styled-components";
import { SideBar } from "../PublicStyle";
import { useEffect, useState } from "react";
import AdminAxiosApi from "../../api/AdminAxios";

export const RightBox = styled.div`
  padding: 5vw;

  h1 {
    font-size: 30px;
    font-weight: 900;
    color: #2d2d2d;
    margin-bottom: 16px;
  }
  .boxFlex {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .labelBox {
      white-space: nowrap;
    }
    .btnBox {
      text-align: right;
      margin-right: 10px;
    }
  }
  .selectBox {
    width: 100%;
    padding: 2% 1%;
    margin-bottom: 2%;
    border: 1px solid #999999;
    border-radius: 10px;

    label {
      cursor: pointer;
      margin-right: 3%;
    }

    & > .loadingBtn {
      margin-right: 10px;
      transition: all 0.3s;
    }
    & > .loadingBtn:hover {
      background-color: #F95001;
      color: #fff;
      border-color: #F95001;
    }

    // 라디오 버튼 css
    input[type="radio"] {
      -webkit-appearance: none; // 웹킷 브라우저에서 기본 스타일 제거
      -moz-appearance: none; // 모질라 브라우저에서 기본 스타일 제거
      appearance: none; // 기본 브라우저에서 기본 스타일 제거
      width: 16px;
      height: 16px;
      margin: 0 5px;
      border: 2px solid #ccc; // 체크되지 않았을 때의 테두리 색상
      border-radius: 50%;
      outline: none; // focus 시에 나타나는 기본 스타일 제거
      cursor: pointer;
    }

    // 체크될 시에, 변화되는 스타일 설정
    input[type="radio"]:checked {
      background-color: #2d2d2d; // 체크 시 내부 원으로 표시될 색상
      border: 3px solid #2d2d2d; // 테두리와 원 사이의 색상
    }

    // 라디오 버튼 옆 버튼양식
    button {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;

      background-color: #fff;
      color: #2d2d2d;
      padding: 8px 12px;
      border-radius: 5px;
      border: 2px solid #999999;
      box-shadow: 3px 2px 4px 1px #d9d9d9;
      cursor: pointer;
    }
  }
  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  // QnA에서 사용
  .flexbox {
    display: flex;
    align-items: center;
    gap: 3%;
    border-bottom: 1px solid #999999;
    padding: 20px 10px;

    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }

  .scrollBox {
    width: 100%;
    overflow-x: scroll;

    &::-webkit-scrollbar {
      height: 8px; /* 스크롤바의 너비 */
      border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb {
      height: 8px;
      background: #2d2d2d; /* 스크롤바의 색상 */
      border-radius: 10px;
    }

    &::-webkit-scrollbar-track {
      background: #fff; /*스크롤바 뒷 배경 색상*/
    }

    table {
      width: 100%;
      white-space: nowrap;

      thead tr {
        color: #fff;
        background-color: #2d2d2d;
        font-size: 18px;
        font-weight: 900;
        text-align: center;
      }
      // 테이블 헤드 부분 둥글게 처리하기
      th:first-child {
        border-top-left-radius: 10px;
      }
      // 테이블 헤드 2번째 ~ 8번째 까지 border-top 부여
      th:nth-child(n + 2):nth-child(-n + 7) {
        border-bottom: 1px solid #999999;
      }
      th:last-child {
        border-top-right-radius: 10px;
      }
      th {
        padding: 10px 20px;
        box-sizing: border-box;
      }
      tbody {
        text-align: center;
        border-radius: 10px;
      }
      tbody tr {
        border: 1px solid #999999;
      }
      td {
        height: 40px;
        padding: 10px 20px;
        vertical-align: middle;

        select {
          -moz-appearance: none;
          -webkit-appearance: none;
          appearance: none;

          color: #444;
          background-color: #fff;

          padding: 10px 15px;
          margin: 0;

          border: 1px solid #aaa;
          border-radius: 5px;
          box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.04);
        }
      }
      input {
        display: inline-block;
        width: 100px;
        height: 40px;
        padding: 10px 15px;
        margin-left: 10px;
        margin-right: 10px;
        border: 1px solid #999999;
        border-radius: 6px;
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
      }
    }
  }
`;
export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 40px auto;
`;

export const PageButton = styled.button`
  border: 1px solid #2d2d2d;
  padding: 5px;
  width: 28px;
  margin: 0 5px;
  background-color: #fff;
  cursor: pointer;
  border-radius: 50%;
  transition: 0.3s;
`;

const Adminmember = () => {
  const [memberList, setMemberList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지
  const [totalPage, setTotalPage] = useState(0); // 총 페이지 수
  const [isTrue, setIsTrue] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filter, setFilter] = useState("all");

  // 리렌더링 용
  const reRender = () => {
    setIsTrue((prev) => !prev);
  };

  // 날짜 포멧
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
  // 총 페이지 수 계산
  useEffect(() => {
    console.log(filter);
    const totalPage = async () => {
      try {
        const res = await AdminAxiosApi.MemberPage(0, 10, filter);
        setTotalPage(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    totalPage();
  }, [filter]);

  useEffect(() => {
    const memberList = async () => {
      try {
        const res = await AdminAxiosApi.MemberPageList(currentPage, 10, filter);
        console.log(res.data);
        setMemberList(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    memberList();
  }, [currentPage, isTrue, filter]);

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


  // 회원삭제
  const HandleDeleteMember = async (email) => {
    const memberDel = async () => {
      try {
        const rsp = await AdminAxiosApi.memberDelete(email);
        console.log(email);
        if (rsp.status === 200) {
          alert("회원 삭제가 완료되었습니다.");
          reRender();
        }
      } catch (e) {
        console.log("에러");
      }
    };
    memberDel();
  };

  const filterChange = (e) => {
    setFilter(e)
    setCurrentPage(0);
  }

  return (
    <>
      <SideBar>
        <RightBox>
          <h1>회원 관리</h1>
          <div className="selectBox">
            <label>
              <input
                type="radio"
                value="all"
                checked={filter === "all"}
                onChange={() => filterChange("all")}
              />
              전체
            </label>
            <label>
              <input
                type="radio"
                value="PREMIUM"
                checked={filter === "PREMIUM"}
                onChange={() => filterChange("PREMIUM")}
              />
              PREMIUM
            </label>
            <label>
              <input
                type="radio"
                value="STANDARD"
                checked={filter === "STANDARD"}
                onChange={() => filterChange("STANDARD")}
              />
              STANDARD
            </label>
            <label>
              <input
                type="radio"
                value="ONE MONTH FREE"
                checked={filter === "ONE MONTH FREE"}
                onChange={() => filterChange("ONE MONTH FREE")}
              />
              ONE MONTH FREE
            </label>
            <label>
              <input
                type="radio"
                value="FREE"
                checked={filter === "FREE"}
                onChange={() => filterChange("FREE")}
              />
              미구독 회원
            </label>
          </div>

          <div className="scrollBox">
            <table>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Addr</th>
                  <th>Tel</th>
                  <th>JoinDate</th>
                  <th>Type</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {memberList.map((member, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{member.memberName}</td>
                    <td>{member.memberEmail}</td>
                    <td>{member.memberAddress}</td>
                    <td>{member.memberTel}</td>
                    <td>{formatDate(member.regDate)}</td>
                    <td>
                      {/* {member.memberGrade === "paid" ? "구독중" : "미구독"} */}
                      {member.memberGrade === null ? "미구독" : member.memberGrade}
                    </td>
                    <td>
                      <button
                        onClick={() => HandleDeleteMember(member.memberEmail)}
                      >
                        삭제
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {renderPagination()}
        </RightBox>
      </SideBar>
    </>
  );
};

export default Adminmember;
