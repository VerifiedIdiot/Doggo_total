package com.Doggo.DoggoEx.controller;


import com.Doggo.DoggoEx.dto.MemberReqDto;
import com.Doggo.DoggoEx.dto.MemberResDto;
import com.Doggo.DoggoEx.dto.PetProfileDto;
import com.Doggo.DoggoEx.service.MemberService;
import com.Doggo.DoggoEx.service.PetProfileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;

    // 회원정보 조회
    @GetMapping("/detail/{email}")
    public ResponseEntity<MemberResDto> memberDetail(@PathVariable String email) {
        MemberResDto memberDto = memberService.getMemberDetail(email);
        return ResponseEntity.ok(memberDto);
    }

    // 회원정보 수정
    @PutMapping("/modify")
    public ResponseEntity<Boolean> memberModify(@RequestBody MemberReqDto memberDto) {
        log.info("memberDto: {}", memberDto.getMemberEmail());
        boolean isTrue = memberService.modifyMember(memberDto);
        return ResponseEntity.ok(isTrue);
    }

    // 회원정보 삭제
    @DeleteMapping("/delete/{email}")
    public ResponseEntity<Boolean> memberDelete(@PathVariable String email) {
        boolean isTrue = memberService.deleteMember(email);
        return ResponseEntity.ok(isTrue);
    }
}
