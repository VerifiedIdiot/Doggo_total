package com.Doggo.DoggoEx.controller;

import com.Doggo.DoggoEx.dto.StrayDto;
import com.Doggo.DoggoEx.service.animals.StrayService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stray")
public class StrayController {
    private final StrayService strayService;

    public StrayController(StrayService strayService) {
        this.strayService = strayService;
    }
    // 파이썬 크롤링 결과 확인용
//    @GetMapping("/get/list")
//    public ResponseEntity<List<StrayDto>> getStrays() {
//        try {
//            List<StrayDto> strays = strayService.getStrays();
//            return ResponseEntity.ok(strays);
//        } catch (Exception e) {
//            // 오류 처리
//            e.printStackTrace();
//            return ResponseEntity.notFound().build();
//        }
//    }
    // 파이썬 크롤링 결과 확인 및 insert
    @GetMapping("/insert")
    public ResponseEntity<?> insertStray() {
        try {
            strayService.insertStrays();
            return ResponseEntity.ok("from flask to spring , to db success");
        } catch (Exception e) {
            // 오류 처리
            e.printStackTrace();
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/get/{region}")
    public ResponseEntity<List<StrayDto>> getStrayList(@PathVariable String region) {
        try {
            List<StrayDto> strayDtos = strayService.getStraysByRegion(region);
            return ResponseEntity.ok(strayDtos);
        } catch (Exception e) {
            // 오류 처리
            e.printStackTrace();
            return ResponseEntity.notFound().build();
        }
    }

}
