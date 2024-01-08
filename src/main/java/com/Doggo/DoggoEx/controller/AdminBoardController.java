package com.Doggo.DoggoEx.controller;
import com.Doggo.DoggoEx.dto.BoardDto;
import com.Doggo.DoggoEx.service.AdminBoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/admin/qna")
@RequiredArgsConstructor
public class AdminBoardController {
    private final AdminBoardService adminBoardService;

    // 문의 전체 조회 → PostController꺼 쓰면 될듯

    // 문의 1:1 상세 조회
    @GetMapping("/detail/{id}")
    public ResponseEntity<BoardDto> boardDetail(@PathVariable Long id) {
        BoardDto boardDto = adminBoardService.getBoardDetail(id);
        return ResponseEntity.ok(boardDto);
    }

    // 문의 답변 업로드
    @PutMapping("/answer/{id}")
    public ResponseEntity<Boolean> answer(@PathVariable Long id, @RequestBody BoardDto boardDto) {
        boolean isTrue = adminBoardService.QnaAnswer(id, boardDto.getAnswer());
        return ResponseEntity.ok(isTrue);
    }

    // 페이지네이션
    @GetMapping("/list/page")
    public ResponseEntity<List<BoardDto>> boardList(@RequestParam(defaultValue = "0") int page,
                                                    @RequestParam(defaultValue = "10") int size,
                                                    @RequestParam String filter) {
        List<BoardDto> list = adminBoardService.getBoardList(page, size, filter);
        log.info("list : {}", list);
        return ResponseEntity.ok(list);
    }

    // 페이지 수 조회
    @GetMapping("/list/count")
    public ResponseEntity<Integer> boardCount(@RequestParam(defaultValue = "0") int page,
                                              @RequestParam(defaultValue = "10") int size,
                                              @RequestParam String filter) {
        PageRequest pageRequest = PageRequest.of(page, size);
        int pageCnt = adminBoardService.getBoardPage(pageRequest, filter);
        return ResponseEntity.ok(pageCnt);
    }
}
