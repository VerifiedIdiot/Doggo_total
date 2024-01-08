package com.Doggo.DoggoEx.controller;


import com.Doggo.DoggoEx.dto.DogDto;
import com.Doggo.DoggoEx.repository.DogRepository;
import com.Doggo.DoggoEx.utils.Views;
import com.Doggo.DoggoEx.service.animals.DogService;
import com.Doggo.DoggoEx.service.animals.EngToKorService;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dogs")
public class DogController {

    private final DogRepository dogRepository;

    private final DogService dogService;
    private final EngToKorService engToKorService;

    public DogController(DogRepository dogRepository, DogService dogService, EngToKorService engToKorService) {
        this.dogRepository = dogRepository;
        this.dogService = dogService;
        this.engToKorService = engToKorService;
    }
    // 필요시에만 INSERT 하시오 , API 허용량 무셔
    @PostMapping("/insert")
    public ResponseEntity<?> insertDogs() {
        try {
            dogRepository.deleteAll();
            dogService.insertDogs();
            return ResponseEntity.ok("애견도감 테이블 insert");
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }

    }

    @GetMapping("/detail/{koreanName}")
    //@ PathVariable에서  RequstParam으로 변경 , 주소에 쿼리파라미터로 전달하는게 url에 직접 기입방식보다 간결함
    public ResponseEntity<DogDto> getDogByName(@PathVariable String koreanName) {
        try {
            DogDto dogDto = dogService.getDogByName(koreanName);
//            DogDto korDogDto = engToKorService.dogToKor(dogDto);
            return ResponseEntity.ok(dogDto);
        } catch (Exception e) {
            // 데이터가 조회되지 않았을때 발생하는 에러를 처리하기 위한 예외처리
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/view/list")
    @JsonView(Views.Public.class)
    public ResponseEntity<List<DogDto>> getDogSimpleView(@RequestParam(defaultValue = "0") int page,
                                                         @RequestParam(defaultValue = "10") int size) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            List<DogDto> dogDtos = dogService.getDogsSortedByKoreanName(pageable);
            return ResponseEntity.ok(dogDtos);
        } catch (Exception e) {
            // 데이터가 조회되지 않았을때 발생하는 에러를 처리하기 위한 예외처리
            return ResponseEntity.notFound().build();
        }

    }

    @GetMapping("/view/search")
    @JsonView(Views.Public.class)
    public ResponseEntity<List<DogDto>> getDogSearchView(@RequestParam String keyword) {
        try {
            List<DogDto> dogs = dogService.getDogsSortedByKeyword(keyword);
            return ResponseEntity.ok(dogs);
        } catch (Exception e) {
            // 데이터가 조회되지 않았을때 발생하는 에러를 처리하기 위한 예외처리
            return ResponseEntity.notFound().build();
        }

    }
    


}
