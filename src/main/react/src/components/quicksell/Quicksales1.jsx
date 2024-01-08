import styled, { css } from "styled-components";
import { useState, useEffect } from "react";
import Modal from "../../utill/Modal";
import { useNavigate } from "react-router-dom";
import AxiosApi from "../../api/Axios";
import AddrModal from "../../utill/AddrModal";

const Container = styled.div`
  width: 80%;

  h1 {
    display: flex;
    align-items: center;
    justify-content: start;
    font-size: 24px;
    width: 100%;
    height: 100px;
    padding-left: 2%;
    font-weight: bold;
  }
  h2 {
    display: flex;
    align-items: center;
    justify-content: start;
    font-size: 15px;
    width: 100%;
    font-weight: bold;
    padding-left: 1%;
  }
  .canclelist {
    width: 100%;
    font-size: 0.7em;
    align-items: center;
    padding: 1% 2%;
    li {
      padding: 5px 0;
      list-style: square;
    }
    @media (max-width: 768px) {
      font-size: 0.5em;
      padding: 1% 4%;
    }
  }

  .cancleInfoBox {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    width: 100%;
    height: 160px;
    background-color: #e2e2e2;
    border-radius: 5px 5px 0 0;
  }
  @media (max-width: 768px) {
    width: 100%;
    }
`;

const SellTable = styled.table`
  width: 100%;
  border: 1px solid #333333;
  tr {
    display: flex;
    flex-direction: row;
  }

  th {
    display: flex;
    justify-content: center;
    width: 10%;
    align-items: center;
    justify-content: center;
    height: 30px;
    border: 1px solid #333333;
    font-size: 13px;
    background-color: #333333;
    color: white;
  }
  @media (max-width: 768px) {
    th{
      font-size: 8px;
    }
    }
`;

const SellTable1 = styled.table`
  width: 102%;
  tr {
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #c8c8c8;;
    border-radius: 5px;
  }

  th {
    display: flex;
    justify-content: center;
    width: 10%;
    align-items: center;
    justify-content: center;
    height: 30px;
    font-size: 10px;
    font-weight: bold;
  }
  @media (max-width: 768px) {
    }
`;

const ScroolBox = styled.div`
  height: 300px;
  width: 100%;
  overflow: auto;
  position: relative;
  overflow-y: scroll;
  border: 1px solid #c8c8c8;
  border-radius: 0 0 5px 5px;
  overflow-x: hidden;
  .innerStyle {
    width: 100%;
    height: 650px;
  }
  @media (max-width: 768px) {
    overflow-: hidden;
  }
`;

const SellButton = styled.button`
  margin: 20px;
  width: 150px;
  height: 40px;
  background-color: #333333;
  color: white;
  border: none;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
  &:active{
    background-color:#F95001;
  }
`;
const CancleButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000000;
  border-radius: 5px;
  color: white;
  height: 25px;
  border: none;
  cursor: pointer;
  white-space: nowrap;
  & + & {
    margin: 5px;
  }
  @media (max-width: 768px) {
    font-size: 0.9em;
    height: 20px;
  }
`;

const Quicksale1 = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [sModalOpen, setSModalOpen] = useState(false);
  const [saleList, setSaleList] = useState([]);
  const [saleNum, setSaleNum] = useState();

  const closeModal = () => {
    setModalOpen(false);
    setSModalOpen(false);
  };

  const CancleClick = (a) => {
    setSaleNum(a);
    setModalOpen(true);
  };


  const SalesDelete = async () => {
    const resp = await AxiosApi.SaleDelete(saleNum);
    if (resp.data === true) {
      alert("취소확인");
      setModalOpen(false);
    } else {
      alert("취소실패");
    }
  };


  useEffect(() => {
    const SalesList = async () => {
      try {
        const resp = await AxiosApi.SaleUserList(); //전체 조회
        if (resp.status === 200) {
          setSaleList(resp.data);
          console.log(resp.data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    SalesList();
  }, [modalOpen]);

  const changeClick =(num)=>{
    setSModalOpen(true);
    setSaleNum(num);
  }

  return (
    <>
      <Container>
        <h1>구독 결제 내역 ( 구독 취소 )</h1>
        <div className="cancleInfoBox">
          <h2>※구독 취소시 주의사항※</h2>
          <ul className="canclelist">
            <li>※ 대상회원, 대상상품,대상 서비스의 내용 등은 회사의 사정에 따라 변경될 수 있으며, 그 변경으로 인하여 본 회원이 본 서비스를 중도에 이용하지 못하게 된 경우 환불한다. </li>
            <li>※ 본 서비스는 무료체험 기간 동안 본 회원에 게 무상으로 제공되며, 무료체험 기간 경과 후에는 이용료를 결제한 본 회원에 한하여 본 서비스를 제공한다.</li>
            <li>※ 사는 본 서비스에 부수하는 개별 서비스에 대한 세부정책을 별도로 정하여 회원에게 통지할 수 있으며, 이 경우 개별 서비스에 대한 세부정책이 본 약관에 우선한다. </li>
            <li>본 서비스는 대상회원이 본 서비스를 위한 약관에 동의함으로써 가입 신청할 수 있다. </li>
          </ul>
        </div>
      </Container>

      <Container>
        <SellTable>
          <tr>
            <th>시작일자</th>
            <th style={{ width: "20%" }}>구독명 / 사료명</th>
            <th>배송 예정일</th>
            <th style={{ width: "30%" }}>배송지</th>
            <th>배송상태</th>
            <th style={{ width: "20%" }}></th>
          </tr>
        </SellTable>
        <ScroolBox>
          <div className="innerStyle">
            <SellTable1>
              {saleList &&
                saleList.map((data, index) => (
                  <tr key={index}>
                    <th>{data.salesRegDate}</th>
                    <th
                      style={{
                        width: "21%",
                      }}
                    >
                      {data.salesName} 버전 구독 /{data.feedName}
                    </th>
                    <th>{data.salesDelivery}</th>
                    <th
                      style={{
                        width: "30%",
                      }}
                    >
                      {data.salesAddr}
                    </th>
                    <th style={{
                        width: "18%",
                        display:"flex", justifyContent:"start"}}>{data.invoice}</th>
                    <th style={{ width: "15%", display:"flex", justifyContent:"start"}}>
                      <CancleButton onClick={() => changeClick(data.saleId)} style={{ backgroundColor: "#F95001" }}>
                        변경
                      </CancleButton>
                      <CancleButton onClick={() => CancleClick(data.saleId)}>
                        취소
                      </CancleButton>
                    </th>
                  </tr>
                ))}
            </SellTable1>
          </div>
        </ScroolBox>
        <div
          style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <SellButton Buttonstlye={true} onClick={() => navigate("/")}>
            홈으로
          </SellButton>
        </div>
      </Container>

      <Modal
        type={1}
        open={modalOpen}
        close={closeModal}
        confirm={SalesDelete}
        header="취소 확인"
      >
        정말 취소 요청 하시겠습니까?
      </Modal>
        <AddrModal
          open={sModalOpen}
          close={closeModal}
          saleNum={saleNum}
        />

    </>
  );
};

export default Quicksale1;
