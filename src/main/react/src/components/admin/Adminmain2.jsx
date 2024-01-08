import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styled from "styled-components";
import { SideBar } from "../PublicStyle";
import { RightBox } from "./Adminmember";
import AdminAxiosApi from "../../api/AdminAxios";

const ChartSize = styled.div`
  width: 100%;
  height: 400px;

  .recharts-legend-wrapper {
    .recharts-default-legend {
      text-align: right !important; 
    }
  }
`;

const Adminmain2 = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const getMemberStats = async () => {
      try {
        // 서버로부터 회원 데이터를 받아옴
        const res = await AdminAxiosApi.memberAllList();
        const data = res.data;

        // regDate를 년도와 월로 자르고 년월별 회원 수를 계산
        const yearlyMonthly = data.reduce((acc, { regDate }) => {
          const date = new Date(regDate);
          const year = date.getFullYear();
          const month = date.getMonth() + 1; // 월은 0부터 시작하므로 1을 더함
          const yearMonth = `${year}년 ${month}월`;
          acc[yearMonth] = (acc[yearMonth] || 0) + 1;
          return acc;
        }, {});

        // 차트에 표시할 형식으로 변환
        const chartData = Object.entries(yearlyMonthly).map(
          ([yearMonth, count]) => ({
            yearMonth,
            count,
          })
        );

        // 변환된 데이터를 state에 설정하여 차트를 다시 렌더링
        setChartData(chartData);
      } catch (error) {
        console.log(error);
      }
    };

    // 페이지가 로드될 때 한 번 실행
    getMemberStats();
  }, []);

  return (
    <SideBar>
      <RightBox>
        <ChartSize>
          <h1>년 월 별 가입자 수</h1>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              {/* CartesianGrid: 차트에 그리드 추가 */}
              <CartesianGrid strokeDasharray="3 3" />
              {/* XAxis: X축 설정 */}
              <XAxis dataKey="yearMonth" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#F95001"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartSize>
      </RightBox>
    </SideBar>
  );
};

export default Adminmain2;
