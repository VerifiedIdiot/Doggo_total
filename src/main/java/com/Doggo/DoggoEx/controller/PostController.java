package com.Doggo.DoggoEx.controller;


import com.Doggo.DoggoEx.dto.BoardDto;
import com.Doggo.DoggoEx.service.BoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/post")
@RequiredArgsConstructor
public class PostController {
    private final BoardService boardService;
    // 문의 등록
    @PostMapping("/new")
    public ResponseEntity<Boolean> boardPlus(@RequestBody BoardDto boardDto) {
        boolean isTrue = boardService.saveBoard(boardDto);
        return ResponseEntity.ok(isTrue);
    }
    // 관리자 업데이트
    @PutMapping("/update/{id}")
    public ResponseEntity<Boolean> userUp(@PathVariable Long id, @RequestBody BoardDto boardDto) {
        boolean isTrue = boardService.updateUserBoard(id, boardDto);
        return ResponseEntity.ok(isTrue);
    }

    // 문의 수정
    @PutMapping("/modify/{id}")
    public ResponseEntity<Boolean> boardUp(@PathVariable Long id, @RequestBody BoardDto boardDto) {
        boolean isTrue = boardService.updateBoard(id, boardDto);
        return ResponseEntity.ok(isTrue);
    }
    // 문의 삭제
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Boolean> boardDel(@PathVariable Long id) {
        boolean isTrue = boardService.deleteBoard(id);
        return ResponseEntity.ok(isTrue);
    }
    // 문의 목록 조회
    @GetMapping("/list")
    public ResponseEntity<List<BoardDto>> oneBoard() {
        List<BoardDto> list = boardService.getOneBoard();
        return ResponseEntity.ok(list);
    }
    // 회원별 문의글 조회
    @GetMapping("/list/{memberEmail}")
    public ResponseEntity<List<BoardDto>> oneBoardByMemberEmail(@PathVariable String memberEmail){
        List<BoardDto> list = boardService.getOneBoardByMemberEmail(memberEmail);
        return ResponseEntity.ok(list);
    }
}
