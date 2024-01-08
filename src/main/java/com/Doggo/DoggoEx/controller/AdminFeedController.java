package com.Doggo.DoggoEx.controller;

import com.Doggo.DoggoEx.dto.BoardDto;
import com.Doggo.DoggoEx.dto.FeedDto;
import com.Doggo.DoggoEx.dto.PetProfileDto;
import com.Doggo.DoggoEx.enums.FeedType;
import com.Doggo.DoggoEx.service.AdminFeedService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/admin/feed")
@RequiredArgsConstructor
public class AdminFeedController {
    private final AdminFeedService adminFeedService;

    // 사료 전체 조회
    @GetMapping("/feeds")
    public ResponseEntity<List<FeedDto>> adminFeedList() {
        List<FeedDto> list = adminFeedService.getAdminFeedList();
        return ResponseEntity.ok(list);
    }

    // 상세 조회
    @GetMapping("/detail/{id}")
    public ResponseEntity<FeedDto> feedDetail(@PathVariable Long id) {
        FeedDto feedDto = adminFeedService.getFeedDetail(id);
        return ResponseEntity.ok(feedDto);
    }

    // 사료 추가 → feedService에 있는거 쓰기

    // 사료 수정
    @PutMapping("/modify/{id}")
    public ResponseEntity<Boolean> modifyFeed(@PathVariable Long id, @RequestBody FeedDto feedDto) {
        boolean isTrue = adminFeedService.modifyFeed(id, feedDto);
        return ResponseEntity.ok(isTrue);
    }


    // 페이지네이션
    @GetMapping("/list/page")
    public ResponseEntity<List<FeedDto>> feedList(@RequestParam(defaultValue = "0") int page,
                                                  @RequestParam(defaultValue = "10") int size,
                                                  @RequestParam FeedType filter) {
        List<FeedDto> list = adminFeedService.getFeedList(page, size, filter);
        log.info("list : {}", list);
        return ResponseEntity.ok(list);
    }

    // 페이지 수 조회
    @GetMapping("/list/count")
    public ResponseEntity<Integer> feedCount(@RequestParam(defaultValue = "0") int page,
                                             @RequestParam(defaultValue = "10") int size,
                                             @RequestParam FeedType filter) {
        PageRequest pageRequest = PageRequest.of(page, size);
        int pageCnt = adminFeedService.getFeedPage(pageRequest, filter);
        return ResponseEntity.ok(pageCnt);
    }
}
