import React, { useRef, useEffect } from "react";
import * as S from "./KakaoMap.style";

const MapModal = ({
  search,
  openMarkerId,
  setOpenMarkerId,
  isModalOpen,
  moveLatLng,
  pagination,
  currentPage,
  setCurrentPage,
}) => {
  const selectedItemRef = useRef(null);

  useEffect(() => {
    if (selectedItemRef.current) {
      selectedItemRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [openMarkerId]);
  return (
    <S.ModalContainer isClosed={!isModalOpen}>
      <S.List>
        {/* 검색된 장소들 목록으로 표시 */}
        {search.map((data) => (
          <S.Item
            key={data.id}
            ref={data.id === openMarkerId ? selectedItemRef : null}
            onClick={() => {
              setOpenMarkerId(data.id);
              moveLatLng(data);
            }}
            selected={data.id === openMarkerId}
          >
            {/* 검색된 장소 상세 정보 표시 */}
            <S.Name>{data.place_name}</S.Name>
            <S.Category>{data.category_name}</S.Category>
            <S.Address>{data.address_name}</S.Address>
            <S.RoadAddress>
              <img
                src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_jibun.png"
                alt="지번"
              />
              <p>
                {data.road_address_name === "" ? "-" : data.road_address_name}
              </p>
            </S.RoadAddress>
            <S.InfoContainer>
              <S.Distance>
                {data.distance >= 1000
                  ? `${(data.distance / 1000).toFixed(1)}km`
                  : `${data.distance}m`}
              </S.Distance>
              {data.phone !== "" && (
                <>
                  <S.Division>|</S.Division>
                  <S.PhoneNumber>{data.phone}</S.PhoneNumber>
                </>
              )}
            </S.InfoContainer>
          </S.Item>
        ))}
      </S.List>
      {/* 검색 결과가 없을 경우 표시 */}
      {search.length === 0 && (
        <S.NoList>검색된 결과가 없다. 멍!🐶 냥!🐱</S.NoList>
      )}
      {/* 검색 결과 있고, 페이지가 있는 경우 페이지 번호 표시 */}
      {pagination && search.length > 0 && (
        <S.Pages>
          {Array.from({ length: pagination.last }).map((_, index) => (
            <S.PageBtn
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              selected={currentPage === index + 1}
            >
              {index + 1}
            </S.PageBtn>
          ))}
        </S.Pages>
      )}
    </S.ModalContainer>
  );
};

export default MapModal;
