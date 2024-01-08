package com.Doggo.DoggoEx.repository;

import com.Doggo.DoggoEx.dto.CatDto;
import com.Doggo.DoggoEx.dto.DogDto;
import com.Doggo.DoggoEx.entity.Cat;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CatRepository extends JpaRepository<Cat, Long> {
    // 묘종명으로 상세정보 return
    Optional<Cat> findByKoreanName(String koreanName);
    // 동물도감 리스트 return
    @Query("SELECT new com.Doggo.DoggoEx.dto.CatDto(c.id, c.name, c.koreanName,c.imageLink) FROM Cat c ORDER BY c.koreanName ASC")
    List<CatDto> findAllByOrderByNameAsc(Pageable pageable);
    // 특정단어가 포함된 리스트 return
    @Query("SELECT new com.Doggo.DoggoEx.dto.CatDto(c.id, c.name, c.koreanName, c.imageLink) FROM Cat c WHERE c.name LIKE %:keyword% OR c.koreanName LIKE %:keyword% ORDER BY c.koreanName ASC")
    List<CatDto> findByKeyword(@Param("keyword") String keyword);
}



