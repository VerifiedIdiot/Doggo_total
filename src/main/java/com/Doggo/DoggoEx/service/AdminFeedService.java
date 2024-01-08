package com.Doggo.DoggoEx.service;

import com.Doggo.DoggoEx.dto.FeedDto;
import com.Doggo.DoggoEx.entity.Feed;
import com.Doggo.DoggoEx.enums.FeedType;
import com.Doggo.DoggoEx.repository.FeedRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminFeedService {

    private final FeedRepository feedRepository;
    private final FeedService feedService;

    // 전체 사료 조회
    public List<FeedDto> getAdminFeedList() {
        List<Feed> feeds = feedRepository.findAll();
        List<FeedDto> feedDtos = new ArrayList<>();
        for (Feed feed : feeds) {
            feedDtos.add(feedService.convertEntityToDto(feed));
        }
        return feedDtos;
    }

    // 사료 추가 → feedService에 있는거 쓰기

    // 상세 조회
    public FeedDto getFeedDetail(Long id) {
        Feed feed = feedRepository.findById(id).orElseThrow(
                () -> new RuntimeException("해당 문의가 존재하지 않습니다.")
        );
        return feedService.convertEntityToDto(feed);
    }

    // 사료 수정
    public boolean modifyFeed(Long id, FeedDto feedDto) {
        try {
            Feed feed = feedRepository.findById(id).orElseThrow(
                    () -> new RuntimeException("해당 사료가 존재하지 않습니다.")
            );
            if(feedDto.getFeedName() != null){
                feed.setFeedName(feedDto.getFeedName());}
            if(feedDto.getFeedInfo() != null){
                feed.setFeedInfo(feedDto.getFeedInfo());}
            if(feedDto.getFeedPrice() != null){
                feed.setFeedPrice(feedDto.getFeedPrice());}
            if(feedDto.getFeedType() != null){
                feed.setFeedType(feedDto.getFeedType());}
            if(feedDto.getFeedImg() != null){
                feed.setFeedImg(feedDto.getFeedImg());}
            feedRepository.save(feed);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    // 페이지네이션
    public List<FeedDto> getFeedList(int page, int size, FeedType filter) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Feed> feedPage;
        if (filter.toString() == "ALL" || filter == null ) {
            // 필터가 "all"이거나 비어있는 경우 모든 데이터를 가져옴
            feedPage = feedRepository.findAll(pageable);
        } else {
            // 특정 필터 조건에 맞는 데이터를 가져옴 (부분 일치 검색)
            feedPage = feedRepository.findByFeedType(filter, pageable);
        }
        List<Feed> feeds = feedPage.getContent();
        List<FeedDto> feedDtos = new ArrayList<>();
        for(Feed feed : feeds) {
            feedDtos.add(feedService.convertEntityToDto(feed));
        }
        return feedDtos;
    }
    // 페이지 수 계산
    public int getFeedPage(Pageable pageable, FeedType filter) {
        Page<Feed> feedPage;
        if (filter.toString() == "ALL" || filter == null ) {
            feedPage = feedRepository.findAll(pageable);
        } else {
            feedPage = feedRepository.findByFeedType(filter, pageable);
        }

        return feedPage.getTotalPages();
    }
}
