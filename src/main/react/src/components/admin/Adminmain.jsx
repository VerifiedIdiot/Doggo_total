import styled from "styled-components";
import { SideBar } from "../PublicStyle";
import { RightBox } from "./Adminmember";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import AdminAxiosApi from "../../api/AdminAxios";

// 차트를 담고있는 컴포넌트, 여기서 크기지정 안하면 차트가 안뜸
export const ChartSize = styled.div`
  width: 100%;
  height: 400px;
  .recharts-legend-wrapper {
    .recharts-default-legend {
      text-align: right !important; 
    }
  }
`;



const Adminmain = () => {
  // axios로 날짜, 판매수, 가격 가져오기
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const getFeedSaleChart = async () => {
      try {
        // 서버로부터 회원 데이터를 받아옴
        // 로그인 하고 관리자 들어가면 데이터 불러와 짐. 로그인 안하면 401 Error
        const res = await AdminAxiosApi.SaleAllList();
        const data = res.data;
        console.log(data);

        // 날짜 별 판매 건 수 + 날짜 별 매출 계산
        const salesByDate = data.reduce((acc, { salesRegDate, salesPrice }) => {
          const date = new Date(salesRegDate);
          const year = date.getFullYear();
          const month = date.getMonth() + 1; // 월은 0부터 시작하므로 1을 더함
          const day = date.getDate();
          const dateString = `${year}- ${month}-${day}`;

          //
          if (!acc[dateString]) {
            // 객체 생성 및 초기화
            acc[dateString] = {
              count: 1,
              totalAmount: salesPrice,
            };
          } else {
            // 데이터가 있으면 해당 날짜에 해당되는 건 수 + 총 매출을 acc에 누적
            acc[dateString].count += 1;
            acc[dateString].totalAmount += salesPrice;
          }

          return acc;
        }, {});

        // 차트에 표시할 형식으로 변환
        // → 날짜 별 건수,총 매출이기 때문에 map(key, value) → date가 key / count, totalAmount가 value임
        const chartData = Object.entries(salesByDate).map(
          ([date, { count, totalAmount }]) => ({
            date,
            count,
            totalAmount,
          })
        );

        // 변환된 데이터를 state에 설정하여 차트를 다시 렌더링
        setChartData(chartData);
      } catch (error) {
        console.log(error);
      }
    };
    getFeedSaleChart();
  }, []);

  return (
    <>
      <SideBar>
        <RightBox>
          <ChartSize>
            <h1>날짜 별 매출 현황</h1>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart width={150} height={40} data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="totalAmount" fill="#F95001" name="총 판매 금액" />
                <Bar dataKey="count" fill="#333333" name="판매 건 수" />
              </BarChart>
            </ResponsiveContainer>
          </ChartSize>
        </RightBox>
      </SideBar>
    </>
  );
};



export default Adminmain;
