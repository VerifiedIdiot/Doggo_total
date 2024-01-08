import { useContext, useEffect, useRef, useState } from "react";
import { loadPaymentWidget } from "@tosspayments/payment-widget-sdk";
import { nanoid } from "nanoid";
import styled from "styled-components";
import { PayContext } from "../context/Paystore";
const BtnStyle = styled.button`
  display: block;
  width: 35%;
  max-width: 300px;
  height: 50px;
  border: none;
  background-color: #f95001;
  border-radius: 10px;
  color: white;
  font-size: 1.2em;
  margin: 0 auto;
  cursor: pointer;
  &:hover {
    background-color: #ff661f;
  }
  @media (max-width: 768px) {
    width: 50%;
  }
`;

const selector = "#payment-widget";
const clientKey = "test_ck_26DlbXAaV06nMWvP60zd8qY50Q9R";
const customerKey = "test_sk_PBal2vxj81vQ6xeZRBye35RQgOAN";

const TossPage = (props) => {
  const paymentWidgetRef = useRef(null);
  const paymentMethodsWidgetRef = useRef(null);
  const { payPrice } = props;
  const [price, setPrice] = useState();
  const context = useContext(PayContext);
  const {
    feedName,
    salesAddr,
    salesAutoDelivery,
    salesDelivery,
    salesPrice,
    title,
    checking,
  } = context;

  useEffect(() => {
    (async () => {
      const paymentWidget = await loadPaymentWidget(clientKey, customerKey);
      const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
        selector,
        { value: price },
        { variantKey: "DEFAULT" }
      );
      paymentWidgetRef.current = paymentWidget;
      paymentMethodsWidgetRef.current = paymentMethodsWidget;
    })();
  }, []);

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;
    if (paymentMethodsWidget == null) {
      return;
    }

    paymentMethodsWidget.updateAmount(price);
  }, [price]);
  const ChangePay = (price) => {
    return Intl.NumberFormat("en-US").format(price);
  };

  const TossClick = async () => {
    console.log(salesAddr, checking, salesAutoDelivery);
    if (!checking) {
      alert("필수 약관에 동의하세요!");
    } else if (salesAddr === "") {
      alert("주소를입력해주세요!");
    } else if (salesAutoDelivery === "" || salesAutoDelivery === undefined) {
      alert("배송일자를 입력해주세요!");
    } else {
      setPrice(payPrice);
      const paymentWidget = paymentWidgetRef.current;
      try {
        await paymentWidget?.requestPayment({
          orderId: nanoid(),
          orderName: "테스트 결제용입니다.",
          customerName: "이름",
          customerEmail: window.localStorage.getItem("email"),
          successUrl: `${window.location.origin}/quick/tosspay/${feedName}/${salesAddr}/${salesAutoDelivery}/${salesDelivery}/${salesPrice}/${title}`,
          failUrl: `${window.location.origin}/quick/sucess`,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  

  return (
    <div style={{ margin: "0 auto" }}>
      <div id="payment-widget" />
      <BtnStyle onClick={TossClick}>{ChangePay(payPrice)}원결제하기</BtnStyle>
    </div>
  );
};
// default 로 이미 사용이 한번되서 에러
export { TossPage };
