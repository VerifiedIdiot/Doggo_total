import { Center } from "../../components/PublicStyle";
import styled, { css } from "styled-components";
import Myprofile from "../../components/member/Myprofile";
import Petprofile from "../../components/member/Petprofile";

const Container = styled.div`
  width: 100%;
  display: flex;
  gap: 1%;

  .Box1 {
    width: 35%;
    padding: 20px;
  }
  .Box2 {
    width: 65%;
    padding: 20px;
  }

  @media (max-width: 768px) {
    flex-direction: column;

    .Box1,
    .Box2 {
      width: 100%;
    }
  }
`;

const MyPage = () => {
  return (
    <Center>
      <Container>
        <div className="Box1">
          <Myprofile />
        </div>
        <div className="Box2">
          <Petprofile />
        </div>
      </Container>
    </Center>
  );
};

export default MyPage;
