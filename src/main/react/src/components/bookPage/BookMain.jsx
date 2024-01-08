import React, { useState } from "react";
import styled from "styled-components";
import TopItems from "./comps/TopItems";
import AnimalList from "./comps/AnimalList";

const SectionContainer = styled.section.withConfig({
  // shouldForwardProp: (prop) => !["inView"].includes(prop),
  className: "section-container",
})`
  display: flex;
  flex-direction: column;
  
  align-items: center;
  width: 95vw;
  min-height: 100vh;
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
`;

const ItemContainer = styled.div.attrs({
  className: "item-container",
})`
  display: flex;
  justify-content: center;

  width: ${(props) => props.$width || "95%"};
  height: ${(props) => props.$height || "20%"};
  min-height: ${(props) => props.$minHeight || "20%"};
`;

const BookMain = () => {
  const [animalType, setAnimalType] = useState("dogs");
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <>
      <SectionContainer>
        <ItemContainer $height="100px">
          <TopItems
            animalType={animalType}
            searchQuery={searchQuery}
            setAnimalType={setAnimalType}
            setPage={setPage}
            setSearchQuery={setSearchQuery}
          />
        </ItemContainer>
        <ItemContainer $height="80%" $minHeight="80%">
          <AnimalList
            animalType={animalType}
            page={page}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </ItemContainer>
      </SectionContainer>
    </>
  );
};

export default BookMain;
