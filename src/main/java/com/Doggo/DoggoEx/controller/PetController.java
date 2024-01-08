package com.Doggo.DoggoEx.controller;


import com.Doggo.DoggoEx.dto.PetProfileDto;
import com.Doggo.DoggoEx.service.PetProfileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/pet")
@RequiredArgsConstructor
public class PetController {
    private final PetProfileService petProfileService;

    // 펫 전체조회
    @GetMapping("/list")
    public ResponseEntity<List<PetProfileDto>> petProfileList() {
        List<PetProfileDto> list = petProfileService.getPetProfileList();
        return ResponseEntity.ok(list);
    }

    // 펫 등록
    @PostMapping("/new")
    public ResponseEntity<Boolean> PetRegister(@RequestBody PetProfileDto petProfileDto) {
        boolean isTrue = petProfileService.savePetProfile(petProfileDto);
        return ResponseEntity.ok(isTrue);
    }

    // 내 펫 조회
    @GetMapping("/list/email")
    public ResponseEntity<List<PetProfileDto>> petProfileByEmail(@RequestParam String email) {
        List<PetProfileDto> list = petProfileService.getPetProfileByEmail(email);
        return ResponseEntity.ok(list);
    }

    // 펫 수정
    @PutMapping("/modify/{id}")
    public ResponseEntity<Boolean> modifyPetProfile(@PathVariable Long id, @RequestBody PetProfileDto petProfileDto) {
        boolean isTrue = petProfileService.modifyPetProfile(id, petProfileDto);
        return ResponseEntity.ok(isTrue);
    }

    // 펫 삭제
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Boolean> petProfileDelete(@PathVariable Long id) {
        boolean isTrue = petProfileService.deletePetProfile(id);
        return ResponseEntity.ok(isTrue);
    }
}
