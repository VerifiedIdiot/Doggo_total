import styled from "styled-components";
import { useState } from "react";
const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  /* box-shadow: 2px 4px 15px 3px rgba(0, 0, 0, 0.2); */
`;

const ItemBox = styled.div`
  display: flex;

  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50%;
  /* border: 1px solid black; */
`;

const InnerBox = styled.div.attrs({
  className: "InnerBox",
})`
  display: flex;
  flex-direction: ${(props) => props.$flexDirection || "row"};

  align-items: ${(props) => props.$alignItems || "center"};
  width: ${(props) => props.$width || "50%"};
  height: 100%;
`;

const ToggleButton = styled.button`
  padding: 10px 20px;
  background-color: gray;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-right: 1vw;
  font-size: 16px;
  &:hover {
    background-color: black;
  }

  @media (max-width: 768px) {
    margin-right: 4vw;
  }
`;
const SearchForm = styled.form`
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: white;
  color: #333;
  font-size: 16px;
  margin-left: 10px;

  &:focus {
    outline: none;
    border-color: var(--blue);
  }
`;

const SearchButton = styled.button`
  
  margin-left: 1vw;
  margin-right: 1vw;
  background-color: #ddd;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  width: 100px;
  height: 36px;
  &:hover {
    background-color: #ccc;
  }
  p {
    font-size: 14px;
    font-weight: bold;
  }
  @media (max-width: 768px) {
    margin-right: 4vw;
  }
`;

const Dropdown = styled.select`
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: white;
  color: #333;
  font-size: 16px;
  margin-left: 10px; // 필요에 따라 조정

  &:focus {
    outline: none;
    border-color: var(--blue);
  }
`;

const TopItems = ({
  animalType,
  setAnimalType,
  setPage,
  setDropdownOption,
  setSearchQuery,
  
}) => {
  const [searchInput, setSearchInput] = useState(""); // 검색 입력 상태 추가
  
  const toggleAnimal = () => {
    setPage(0);
    setAnimalType(animalType === "dogs" ? "cats" : "dogs");
    setSearchQuery("");
    setSearchInput("");
  };
  // 추후 드롭다운을 위해
  const handleDropdownChange = (e) => {
    setDropdownOption(e.target.value);
  };

  // 검색 버튼
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const query = searchInput.trim(); // 수정: searchInput 상태 사용
  
    if (query !== "") {
      setSearchQuery(query); // 검색 쿼리 상태 업데이트
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <>
      <ItemContainer>
        <ItemBox>
          <InnerBox
            $width="100%"
            $flexDirection="row-reverse"
            $justifyContent="flex-start">
            <ToggleButton onClick={toggleAnimal}>
              {animalType === "dogs" ? "고양이 도감 전환" : "강아지 도감 전환"}
            </ToggleButton>
          </InnerBox>
        </ItemBox>
        <ItemBox>
          <InnerBox
            $width="100%"
            $flexDirection="row-reverse"
            $justifyContent="flex-start">
            <SearchForm onSubmit={handleFormSubmit}>
              <SearchInput
                name="search"
                type="text"
                placeholder="품종명을 입력해주세요!"
                value={searchInput} // 검색 입력 상태와 연결
                onChange={handleSearchInputChange} // 입력 변경 핸들러
              />
              <SearchButton type="submit"><p>검색</p></SearchButton>
            </SearchForm>
          </InnerBox>
        </ItemBox>
      </ItemContainer>
    </>
  );
};

export default TopItems;
