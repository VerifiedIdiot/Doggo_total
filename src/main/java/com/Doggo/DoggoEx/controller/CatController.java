package com.Doggo.DoggoEx.controller;

import com.Doggo.DoggoEx.dto.CatDto;
import com.Doggo.DoggoEx.dto.DogDto;
import com.Doggo.DoggoEx.repository.CatRepository;
import com.Doggo.DoggoEx.utils.Views;
import com.Doggo.DoggoEx.service.animals.CatService;
import com.Doggo.DoggoEx.service.animals.EngToKorService;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cats")
public class CatController {
    private final CatRepository catRepository;
    private final CatService catService;
    private final EngToKorService engToKorService;


    public CatController(CatRepository catRepository, CatService catService, EngToKorService engToKorService) {
        this.catRepository = catRepository;
        this.catService = catService;
        this.engToKorService = engToKorService;
    }

//     필요시에만 INSERT 하시오 , API 허용량 무셔

    @PostMapping("/insert")
   public ResponseEntity<?> catInsert() {
        try {
            catRepository.deleteAll();
            catService.insertCats();
            return ResponseEntity.ok("애묘도감 테이블 insert");
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/detail/{koreanName}")
    //@ PathVariable에서  RequstParam으로 변경 , 주소에 쿼리파라미터로 전달하는게 url에 직접 기입방식보다 간결함
    public ResponseEntity<CatDto> getCatByName(@PathVariable String koreanName) {
        try {
            CatDto catDto = catService.getCatByName(koreanName);

            return ResponseEntity.ok(catDto);
        } catch (Exception e) {
            // 데이터가 조회되지 않았을때 발생하는 에러를 처리하기 위한 예외처리
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/view/list")
    @JsonView(Views.Public.class)
    public ResponseEntity<List<CatDto>> getCatSimpleView(@RequestParam(defaultValue = "0") int page,
                                                         @RequestParam(defaultValue = "10") int size) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            List<CatDto> catDtos = catService.getCatsSortedByKoreanName(pageable);
            return ResponseEntity.ok(catDtos);
        } catch (Exception e) {
            // 데이터가 조회되지 않았을때 발생하는 에러를 처리하기 위한 예외처리
            return ResponseEntity.notFound().build();
        }

    }

    @GetMapping("/view/search")
    @JsonView(Views.Public.class)
    public ResponseEntity<List<CatDto>> getCatSearchView(@RequestParam String keyword) {
        try {
            List<CatDto> cats = catService.getCatsSortedByKeyword(keyword);
            return ResponseEntity.ok(cats);
        } catch (Exception e) {
            // 데이터가 조회되지 않았을때 발생하는 에러를 처리하기 위한 예외처리
            return ResponseEntity.notFound().build();
        }

    }
}


