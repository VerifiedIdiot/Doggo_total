import Common from "../utill/Common";
import AxiosInstance from "../utill/AxiosInstance";
const MUNG_HOST = "";


const ServiceApi = {
  //문의 요청하는 부분 추가를 하기 위해 제출하는거랑 짝
  boardPlus: async (boardType, comment, boardImg) => {
    console.log(boardType, comment, boardImg);
    const res = await Common.TakenToken();
    const email = res.data;
    const serviceData = {
      memberEmail: email,
      boardType: boardType,
      comment: comment,
      boardImg: boardImg,
    };
    console.log(serviceData);
    return await AxiosInstance.post(MUNG_HOST + "/post/new", serviceData);
  },
  // 회원별 조회
  oneBoardByMemberEmail: async () => {
    const res = await Common.TakenToken();
    const email = res.data;
    console.log(email);
    return await AxiosInstance.get(MUNG_HOST + `/post/list/${email}`);
  },
  // 문의 수정
  boardUp: async (id, boardType, comment, boardImg) => {
    console.log(id, boardType, comment, boardImg);
    const res = await Common.TakenToken();
    const email = res.data;
    const boardUpData = {
      memberEmail: email,
      boardType: boardType,
      comment: comment,
      boardImg: boardImg,
    };
    console.log(boardUpData);
    return await AxiosInstance.put(
      Common.MUNG_HOST + `/post/modify/${id}`,
      boardUpData
    );
  },
  // 문의 삭제
  boardDel: async (id) => {
    console.log(id);
    return await AxiosInstance.delete(MUNG_HOST + `/post/delete/${id}`);
  },
};
export default ServiceApi;
