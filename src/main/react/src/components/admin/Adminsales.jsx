import { useEffect, useState } from "react";
import { SideBar } from "../PublicStyle";
import {
  RightBox,
  PaginationContainer,
  PageButton,
} from "../admin/Adminmember";
import AdminAxiosApi from "../../api/AdminAxios";

const Adminsales = () => {
  const [orders, setOrders] = useState([]);
  const [orderstatus, setOrderstatus] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지
  const [totalPage, setTotalPage] = useState(0); // 총 페이지 수
  const [isTrue, setIsTrue] = useState(false);
  const [filter, setFilter] = useState("all");
  const [invoiceInput, setInvoiceInput] = useState("");
  const [orderStatusList, setOrderStatusList] = useState([]);


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
        const res = await AdminAxiosApi.SalePage(0, 10, filter);
        console.log(res)
        setTotalPage(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    totalPage();
  }, [filter]);

  useEffect(() => {
    const saleList = async () => {
      try {
        const res = await AdminAxiosApi.SalePageList(currentPage, 10, filter);
        console.log(res.data);
        setOrders(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    saleList();
  }, [currentPage, isTrue, filter,orderStatusList]);

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

  // 송장번호 입력 .. orderStatus 빼면 송장번호 값이 안들어감.
  const HandleInvoiceUpload = async (id, orderStatus, invoiceInput) => {
    try {
      console.log(invoiceInput);
      const onlyNum = /^[0-9]+$/.test(invoiceInput) || "";
      // if (!onlyNum) {
      //   alert("송장번호는 숫자로만 입력 가능합니다.");
      //   return;
      // }
      const res = await AdminAxiosApi.InvoiceInput(
        id,
        orderStatus,
        invoiceInput
      );
      if (res.data === true) {
        const res = await AdminAxiosApi.SaleAllList(id);
        console.log(res);
        console.log(res.data);

        setInvoiceInput("");
        reRender();
      }else{console.log("안됨")}
    } catch (e) {
      // 토큰 만료시, 이쪽으로 넘어감
      console.error(e);
      alert("입력 오류");
      reRender();
    }
  };

  const handleStatusChange = (index, value) => {
    const updatedStatusList = [...orderStatusList];
    updatedStatusList[index] = value;
    setOrderStatusList(updatedStatusList);
  };

  const filterChange = (e) => {
    setFilter(e)
    setCurrentPage(0);
  }
  return (
    <>
      <SideBar>
        <RightBox>
          <h1> 판매/주문 관리</h1>
          <div className="selectBox">
            <label>
              <input
                type="radio"
                value="all"
                checked={filter === "all"}
                onChange={()=>filterChange("all")}
              />
              전체
            </label>
            <label>
              <input
                type="radio"
                value="pending"
                checked={filter === "준비중"}
                onChange={()=>filterChange("준비중")}
              />
              준비중
            </label>
            <label>
              <input
                type="radio"
                value="delay"
                checked={filter === "출고지연"}
                onChange={()=>filterChange("출고지연")}
              />
              출고지연
            </label>
            <label>
              <input
                type="radio"
                value="shipped"
                checked={filter === "출고완료"}
                onChange={()=>filterChange("출고완료")}
              />
              출고완료
            </label>
            <label>
              <input
                type="radio"
                value="completed"
                checked={filter === "배송완료"}
                onChange={()=>filterChange("배송완료")}
              />
              배송완료
            </label>
          </div>

          <div className="scrollBox">
            <table>
              <thead>
                <tr>
                  <th>Order No.</th>
                  <th>Date</th>
                  <th>ID</th>
                  <th>Addr</th>
                  <th>Order</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Invoice</th>
                  <th>Input</th>
                  {/* <th className="btnArea"></th> */}
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{formatDate(order.salesRegDate)}</td>
                    <td>{order.memberId}</td>
                    <td>{order.salesAddr}</td>
                    <td>{order.feedName}</td>
                    <td>{order.salesPrice}</td>
                    <td onChange={(e) => setOrderstatus(e.target.value)}>
                      {order.orderStatus}
                    </td>
                    <td>{order.invoice}</td>
                    <td>
                      <label>
                        <select
                          size={1}
                          value={orderStatusList[index] || ""}
                          onChange={(e) =>
                            handleStatusChange(index, e.target.value)
                          }
                        >
                          <option value="준비중">준비중</option>
                          <option value="출고지연">출고지연</option>
                          <option value="출고완료">출고완료</option>
                          <option value="배송완료">배송완료</option>
                        </select>
                      </label>

                      <input
                        type="number"
                        placeholder="송장 번호"
                        // value={order.invoiceInput}       // order. 빼면 전체 input에 적힘
                        onChange={(e) => setInvoiceInput(e.target.value)}
                      />
                      <button
                        onClick={() =>
                          HandleInvoiceUpload(
                            order.saleId,
                            orderStatusList[index],
                            invoiceInput
                          )
                        }
                      >
                        입력
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

export default Adminsales;
