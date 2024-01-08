import React, { useState } from "react";
import styled from "styled-components";
import AboutUs from "./comps/AboutUs";
import AboutFunctions from "./comps/AboutFunctions";


const SectionContainer = styled.section.withConfig({
  className: "section-container",
})`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${(props) => props.$width || "98vw"};
  height: ${(props) => props.$height || "50vw"};
  background-color: ${(props) => props.$backGround || "white"};
`;


const ItemContainer = styled.div.attrs({
  className: "item-container",
})`
  display: flex;
  justify-content: center;
  width: 100%;
  height: ${(props) => props.$height || "30%"};

 
`;





const AboutMain = () => {

  

  return (
    <>
       
        <SectionContainer $height="35vw" $backGround="#fff">
          <ItemContainer $height="100%">
            <AboutUs />
          </ItemContainer>
        </SectionContainer>

        <SectionContainer $backGround="#f2f2f4">
          <ItemContainer $height="100%">
            <AboutFunctions />
          </ItemContainer>
        </SectionContainer>
    </>
  );
};

export default AboutMain;



