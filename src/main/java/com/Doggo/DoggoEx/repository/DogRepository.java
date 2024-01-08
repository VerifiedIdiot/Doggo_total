package com.Doggo.DoggoEx.repository;


import com.Doggo.DoggoEx.dto.DogDto;
import com.Doggo.DoggoEx.entity.Dog;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface DogRepository extends JpaRepository<Dog, Long> {
    // 품종명으로 검색
    Optional<Dog> findByKoreanName(String koreanName);


    // 동물 도감 리스트
    @Query("SELECT new com.Doggo.DoggoEx.dto.DogDto(d.id, d.name, d.koreanName, d.imageLink) FROM Dog d ORDER BY d.koreanName ASC")
    List<DogDto> findAllByOrderByNameAsc(Pageable pageable);


    // 특정단어가 포함된 품종명 리스트
    @Query("SELECT new com.Doggo.DoggoEx.dto.DogDto(d.id, d.name, d.koreanName, d.imageLink) FROM Dog d WHERE d.name LIKE %:keyword% OR d.koreanName LIKE %:keyword% ORDER BY d.koreanName ASC")
    List<DogDto> findByKeyword(@Param("keyword") String keyword);
}