import React from "react";
import styled from "styled-components";

const ItemBox = styled.div.attrs({
  className: "item-box",
})`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35%;
  /* border: 1px solid black; */
`;
const Items = styled.div.attrs({
  className: "item-userStatus",
})`
  width: 98%;
  height: 98%;
  background-color: #d9d9d9;
  border: 1px solid black;
  border-radius: 10px;
`;

const Profiles = styled.div`
  display: flex;
  height: 60%;
  /* border: 1px solid black; */
`;

const ProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
  border: 1px solid black;
`;

const Contents = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  align-items: center;
  height: 40%;
  /* border: 1px solid black; */
`;

const Content = styled.div`
  height: 30%;
  width: ${(props) => props.width || "100%"};
  border: 1px solid black;
  border-radius: ${(props) => props.radius || "10px"};
  margin-top: 3%;
`;

const UserStatus = () => {
  return (
    <>
      <ItemBox>
        <Items>
          <Profiles>
            <ProfileBox></ProfileBox>
            <ProfileBox></ProfileBox>
          </Profiles>
          <Contents>
            <Content width="80%" />
            <Content radius="0 0 10px 10px" />
          </Contents>
        </Items>
      </ItemBox>
    </>
  );
};

export default UserStatus;