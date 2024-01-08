package com.Doggo.DoggoEx.controller;

import com.Doggo.DoggoEx.dto.QuestDto;
import com.Doggo.DoggoEx.dto.SaleDto;
import com.Doggo.DoggoEx.service.QuestService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Slf4j
//@CrossOrigin(origins = CORS_ORIGIN)
@RestController
@RequestMapping("/quest")
@RequiredArgsConstructor
public class QuestController {
    private final QuestService questService;
    //수행 등록
    @PostMapping("/new")
    public ResponseEntity<Boolean> questReg(@RequestBody QuestDto questDto){
        boolean isTrue =questService.saveQuest(questDto);
        return ResponseEntity.ok(isTrue);
    }
    // 수행정보 수정
    @PutMapping("/modify/{id}")
    public ResponseEntity<Boolean> modifyQuest(@PathVariable Long id, @RequestBody QuestDto questDto) {
        boolean isTrue = questService.modifyQuest(id, questDto);
        return ResponseEntity.ok(isTrue);
    }
    // 조회
    @PutMapping("/detail/{id}")
    public ResponseEntity<QuestDto> questDetail(@PathVariable Long id, @RequestBody QuestDto questDto ) {
            QuestDto questDto1=questService.petQuestDetail(id,questDto);
        return ResponseEntity.ok(questDto1);
    }

    //강아지별 조회
    @PutMapping("/percent/{email}")
    public ResponseEntity <List<QuestDto>> petQuestList(@PathVariable String email, @RequestBody QuestDto questDto ) {
        List<QuestDto> questDtos =questService.petPercent(email,questDto.getQuestPerformance());
        return ResponseEntity.ok(questDtos);
    }
    // 맴버별 평균 값 조회
    @PutMapping("/member/percnet/{email}")
    public ResponseEntity <Map<LocalDate,Integer>> petQuestList(@PathVariable String email) {
        Map<LocalDate,Integer> percentMap =questService.memberPercent(email);
        return ResponseEntity.ok(percentMap);
    }




}
