import axios from "axios";
import Common from "../utill/Common";
import AxiosInstance from "../utill/AxiosInstance";

const MUNG_HOST = "";


const AdminAxiosApi = {

  // ----------------------------- Admin Member
  memberAllList: async () => {
    return await AxiosInstance.get(MUNG_HOST + `/admin/member/members`);
  },
  memberDelete: async (email) => {
    return await AxiosInstance.delete(MUNG_HOST + `/admin/member/members/${email}`, {
        headers: {
            "Content-Type": "application/json",
        },
    });
  },
    // 회원 페이지 수 조회
    MemberPage: async (page, size, filter) => {
      return await AxiosInstance.get(
        MUNG_HOST + `/admin/member/list/count?filter=${filter}&page=${page}&size=${size}`);
    },
    
    // 회원 페이지네이션 조회
    MemberPageList: async (page, size, filter) => {
      return await AxiosInstance.get(
        MUNG_HOST + `/admin/member/list/page?filter=${filter}&page=${page}&size=${size}`);
    },

  // ----------------------------- Admin Sale
  SaleAllList: async () => {
    const accessToken = Common.getAccessToken();
    return await AxiosInstance.get(MUNG_HOST + `/sale/list/all`,{
      // headers: {
      //   "Content-Type": "application/json",
      //   Authorization: "Bearer " + accessToken,
      // },
    });
  },

  InvoiceInput: async (id, orderStatus, invoice) => {
    console.log("id : " + id, "판매상태 : " + orderStatus + "배송번호 : " + invoice);

    const InvoiceData = {
      id: id,
      orderStatus: orderStatus, 
      invoice: invoice,
    };
    return await AxiosInstance.put(MUNG_HOST + `/admin/sales/order/${id}`, InvoiceData)
  },

  // 판매 페이지 수 조회
  SalePage: async (page, size, filter) => {
    return await AxiosInstance.get(
      MUNG_HOST + `/admin/sales/list/count?filter=${filter}&page=${page}&size=${size}`
    );
  },
  // 판매 페이지네이션 조회
  SalePageList: async (page, size, filter) => {
    return await AxiosInstance.get(
      MUNG_HOST + `/admin/sales/list/page?filter=${filter}&page=${page}&size=${size}`
    );
  },
  
  // ------------------------------ Admin Board
  QnaAllList: async () => {
    return await AxiosInstance.get(MUNG_HOST + `/post/list`);
  },
  // 문의 페이지 수 조회
  QnaPage: async (page, size, filter) => {
    return await AxiosInstance.get(
      MUNG_HOST + `/admin/qna/list/count?filter=${filter}&page=${page}&size=${size}`
    );
  },
  // 문의 페이지네이션 조회
  QnaPageList: async (page, size, filter) => {
    return await AxiosInstance.get(
      MUNG_HOST + `/admin/qna/list/page?filter=${filter}&page=${page}&size=${size}`
    );
  },
  QnaDetail: async (id) => {
    return await AxiosInstance.get(MUNG_HOST + `/admin/qna/detail/${id}`);
  },
  AnswerChange: async (id,answer) => {
    const AnswerData = {
        answer: answer,
    };
    return await AxiosInstance.put(MUNG_HOST +`/admin/qna/answer/${id}`,AnswerData);
  },

  // -------------------------------- Admin Feed
  // 전체조회
  FeedAllList: async () => {
    return await axios.get(MUNG_HOST + `/admin/feed/feeds`);
  },
  // 상세조회
  FeedDetail: async (id) => {
    return await axios.get(MUNG_HOST + `/admin/feed/detail/${id}`);
  },
  // 사료 추가 → 만들어둔거 쓰기 FeedReg
  // 사료 수정
  FeedModify: async (id, feedImg, feedType, feedName, feedPrice, feedInfo) => {
    const FeedData = {
      feedId: id,
      // image값이 존재할 때만 imageLink 추가
      ...(feedImg && { feedImg: feedImg }),
      feedType: feedType,
      feedName: feedName,
      feedPrice: feedPrice,
      feedInfo: feedInfo,
    };
    return await axios.put(MUNG_HOST + `/admin/feed/modify/${id}`, FeedData);
  },
  // 사료 삭제
  FeedDelete: async (id) => {
    return await axios.delete(MUNG_HOST + `/feed/delete/${id}`);
  },
  // 사료 페이지 수 조회
  FeedPage: async (page, size, filter) => {
    return await axios.get(
      MUNG_HOST + `/admin/feed/list/count?filter=${filter}&page=${page}&size=${size}`
    );
  },
  // 사료 페이지네이션
  FeedPageList: async (page, size, filter) => {
    return await axios.get(
      MUNG_HOST + `/admin/feed/list/page?filter=${filter}&page=${page}&size=${size}`
    );
  },
  // -------------------------------- Admin Feed
  // 견종 조회
  InsertDog: async () => {
    return await axios.post(
      MUNG_HOST + `/api/dogs/insert`)
  },
  // 묘종 조회
  InsertCat: async () => {
    return await axios.post(
      MUNG_HOST + `/api/cats/insert`)
  }
}





export default AdminAxiosApi;