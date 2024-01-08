import React, { useState, useEffect, useRef, useLayoutEffect} from "react";
import { useInView } from "react-intersection-observer";
import _ from "lodash";
import { getAnimals, getDetails, getSearchedAnimals } from "../../../api/AnimalsApi";
import AnimalModal, {
  AnimalAttributeBar,
  BreedNameSection,
  BreedInfoSection,
} from "./AnimalModal";
import styled from "styled-components";

const ItemContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  min-height: 500px;
  height: 100%;
`;

const BreedListBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
  height: 500px;
  border: 1px solid black;
  border-radius: 10px;
`;

const BreedItemsBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: stretch;
  width: 100%;
  height: auto;
  min-height: 500px;
  
  border-radius: 10px;
  padding: 10px;
`;

const BreedItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: calc(20% - 20px);
  height: 20vw;
  margin: 10px;
  transition: opacity 0.5s ease-in;
  background-color: #f8f9fa;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid #ddd;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    box-shadow: 0 3px 3px rgba(0, 0, 0, 0.25);
    transform: scale(1.02);
    transition: 0.3s linear;
  }

  img {
    width: 100%;
    height: 85%; // 이미지 높이
    object-fit: cover;
    border-radius: 10px 10px 0 0;
  }
  p,
  h3 {
    margin-left: 0.5vw;

    font-size: 0.8vw;
  }
  h3 {
    font-weight: bold;
  }
  p {
    padding-bottom: 0.5vw;
    color: #a3a1a1;
  }
  @media (max-width: 768px) {
    width: calc(50% - 20px); // 너비 조정 (화면이 좁을 때)
    height: 40vw;
    h3{
      font-size: 12px;
    }
    p {
      font-size: 10px;
    }
  }
`;

const AnimalList = ({ animalType, searchQuery, setSearchQuery }) => {
  const [animals, setAnimals] = useState([]);
  const [page, setPage] = useState(0);
  const loader = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  

  // animalType이 변경될 때 첫 페이지 데이터 로딩
  useLayoutEffect(() => {
    const fetchAnimalsData = async () => {
      const page = 0;
      const size = 20;
      const newAnimals = await getAnimals(animalType, page, size);
      setAnimals(newAnimals);
    };

    if (searchQuery.trim() === "") {
      setPage(0);
      fetchAnimalsData();
    }
  }, [animalType, searchQuery]);

  // page가 변경될 때 추가 데이터 로딩 (무한 스크롤)
  useLayoutEffect(() => {
    if (page !== 0 && searchQuery.trim() === "") {
      
      const fetchMoreAnimals = async () => {
        try {
        const size = 20;
        const moreAnimals = await getAnimals(animalType, page, size);
        setAnimals((prevAnimals) => [...prevAnimals, ...moreAnimals]);
        console.log(animals);
      
      } catch (error) {
        console.error("Error fetching animals: ", error);
      }
    };
      fetchMoreAnimals();
    }
  }, [page, animalType]);

  // 검색 쿼리가 변경될 때 검색 결과 로딩
  useEffect(() => {
    if (searchQuery.trim() !== "") {
      const fetchSearchedAnimals = async () => {
        const searchedAnimals = await getSearchedAnimals(animalType, searchQuery);
        setAnimals(searchedAnimals);
  
        // 검색 결과가 비어있는 경우 경고창 표시 및 초기화
        if (searchedAnimals.length === 0) {
          alert("해당하는 품종이 없습니다. 다른 검색어를 시도해보세요.");
          loadInitialData();
        }
      };
  
      fetchSearchedAnimals();
    }
  }, [searchQuery, animalType]);

  // 해당하는 품종이 없다는 경고 발생시 실행되는 함수
  const loadInitialData = async () => {
    const newAnimals = await getAnimals(animalType, 0, 20);
    setAnimals(newAnimals);
    setPage(0); // 페이지 번호를 초기화
    setSearchQuery("");
  };

  // 스크롤 이벤트 핸들러 및 Intersection Observer 설정
  const handleObserver = (objects) => {
    const target = objects[0];
    if (target.isIntersecting && searchQuery.trim() === "") {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useLayoutEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "5%",
      threshold: 1.0,
    });

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, []);

  useLayoutEffect(() => {
    // 페이지가 로드될 때마다 스크롤을 최상단으로 이동
    window.scrollTo(0, 0);
  }, []);

  // 토글버튼 클릭시 값 초기화
  useLayoutEffect(() => {
    setPage(0);
    
  }, [animalType]);



  // 검색 결과에 반응하는 이펙트훅
  useLayoutEffect(() => {
    if (searchQuery.trim() === "") {
      // 여기에 초기 데이터 로드 로직 구현
    }
  }, [searchQuery]);

  // 모달 열기
  const openModal = async (animalType, korean_name) => {
    try {
      const animalDetails = await getDetails(animalType, korean_name); // 수정된 부분
      console.log(animalDetails);
      setSelectedAnimal(animalDetails);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching animal details: ", error);
    }
  };

  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAnimal(null);
  };

  // 품종별 이미지와 품종명을 담는 엘리먼트
  const AnimalViewItem = ({ animal }) => {
    const [ref, inView] = useInView({
      triggerOnce: true,
      threshold: 0.1,
    });

    return (
      <BreedItem
        ref={ref}
        style={{ opacity: inView ? 1 : 0 }}
        onClick={() => openModal(animalType, animal.korean_name)}>
        <img
          src={animal.image_link}
          alt={`${animal.korean_name} 이미지`}
          loading="lazy"
        />
        <h3>{animal.korean_name}</h3>
        <p>{animal.name}</p>
      </BreedItem>
    );
  };

  // 메인 구현단
  return (
    <>
      <ItemContainer>
        <BreedItemsBox>
          {animals.map((animal, index) => (
            <AnimalViewItem key={index} animal={animal} />
          ))}
          <div ref={loader} />
        </BreedItemsBox>
      </ItemContainer>

      {isModalOpen && (
        <AnimalModal
          $isOpen={isModalOpen}
          $onClose={closeModal}
          imageSrc={selectedAnimal?.image_link}>
          <BreedNameSection>
            <h1>{selectedAnimal?.korean_name}</h1>
            <h2>{selectedAnimal?.name}</h2>
          </BreedNameSection>
          {animalType === "dogs" ? (
            <BreedInfoSection>
              <AnimalAttributeBar
                label="사회성"
                value={selectedAnimal.good_with_children}
              />
              <AnimalAttributeBar
                label="활발함"
                value={selectedAnimal.playfulness}
              />
              <AnimalAttributeBar label="짖음" value={selectedAnimal.barking} />
              <AnimalAttributeBar
                label="침흘림"
                value={selectedAnimal.drooling}
              />
              <AnimalAttributeBar
                label="털빠짐"
                value={selectedAnimal.shedding}
              />
              <AnimalAttributeBar
                label="털관리"
                value={selectedAnimal.grooming}
              />
            </BreedInfoSection>
          ) : animalType === "cats" ? (
            <BreedInfoSection>
              <AnimalAttributeBar
                label="사회성"
                value={selectedAnimal.children_friendly}
              />
              <AnimalAttributeBar
                label="활발함"
                value={selectedAnimal.playfulness}
              />
              <AnimalAttributeBar label="울음" value={selectedAnimal.meowing} />
              <AnimalAttributeBar
                label="건강"
                value={selectedAnimal.general_health}
              />
              <AnimalAttributeBar
                label="털빠짐"
                value={selectedAnimal.shedding}
              />
              <AnimalAttributeBar
                label="털관리"
                value={selectedAnimal.grooming}
              />
            </BreedInfoSection>
          ) : null}
        </AnimalModal>
      )}
    </>
  );
};

export default AnimalList;
