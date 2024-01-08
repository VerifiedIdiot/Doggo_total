import {  useEffect } from "react";
import { Center } from "../../components/PublicStyle";
import AxiosApi from "../../api/Axios";
import { useNavigate, useParams } from "react-router-dom";


const Quicktoss = () =>{
  const navigate = useNavigate();
  const {feedName,salesAddr,salesAutoDelivery,salesDelivery,salesPrice,title}=useParams();

  useEffect(() => {
    const SaleReg = async () => {
      console.log(feedName,salesAddr,salesAutoDelivery,salesDelivery,salesPrice,title);
      try {
        const res = await AxiosApi.memberGet();
        console.log(res.data.memberGrade);
        const resp = await AxiosApi.SaleReg(feedName,salesAddr,salesAutoDelivery,salesDelivery,salesPrice,title); //결제
        if (resp.status === 200 ){
          await AxiosApi.memberUpdate(title, 5);
          navigate(`/quick/sucess/${resp.data}`);
          }else{
            console.log("결제가 실패했습니다.")
            navigate("/quick")
          }
      } catch (e) {
            console.log(e);
      }};
      SaleReg();
    }, []);

    return(
        <>
        <Center>
          <div>결제중 입니다.</div>
        </Center>
        </>)
}

export default Quicktoss;