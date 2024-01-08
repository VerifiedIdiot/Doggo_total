package com.Doggo.DoggoEx.service;


import com.Doggo.DoggoEx.dto.FeedDto;
import com.Doggo.DoggoEx.entity.Board;
import com.Doggo.DoggoEx.entity.Feed;
import com.Doggo.DoggoEx.enums.FeedType;
import com.Doggo.DoggoEx.repository.FeedRepository;
import com.Doggo.DoggoEx.repository.SaleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Slf4j
@Service
@RequiredArgsConstructor
public class FeedService {
    private final FeedRepository feedRepository;

    //사료 등록
    public boolean saveFeed(FeedDto feedDto) {
        try {
            Feed feed =new Feed();
            feed.setFeedName(feedDto.getFeedName());
            feed.setFeedInfo(feedDto.getFeedInfo());
            feed.setFeedPrice(feedDto.getFeedPrice());
            feed.setFeedType(feedDto.getFeedType());
            feed.setFeedImg(feedDto.getFeedImg());
            feed.setFeedSubscribe(0);
            feedRepository.save(feed);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
    // 사료 삭제
    public boolean deleteFeed(Long id){
        try{
            feedRepository.deleteById(id);
            return true;
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }

    //개 ,고양이 사료별 조회
    public List<FeedDto> getFeedList(FeedType feedType){
        List<Feed> Feeds =feedRepository.findByFeedType(feedType);
        List<FeedDto> FeedDtos = new ArrayList<>();
        for(Feed feed: Feeds) {
            FeedDtos.add(convertEntityToDto(feed));
        }
        return FeedDtos;
    }

    //사료 정보 조회
    public FeedDto getFeedInfo(Long id){
        Feed feed = feedRepository.findById(id).orElseThrow(
                ()-> new RuntimeException("사료 정보를 찾을수없습니다.")
        );
        return convertEntityToDto(feed);
    }


    //사료 판매 완료후 판매수 증가
    public boolean cntFeed(Long id) {
        try {
            Feed feed = feedRepository.findById(id).orElseThrow(
                    () -> new RuntimeException("해당 사료가 존재하지 않습니다.")
            );
            feed.setFeedSubscribe(feed.getFeedSubscribe()+1);
            feedRepository.save(feed);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    // FEED 엔티티를 DTO로 변환
    public FeedDto convertEntityToDto(Feed feed) {
        FeedDto feedDto = new FeedDto();
        feedDto.setFeedId(feed.getId());
        feedDto.setFeedInfo(feed.getFeedInfo());           // 사료정보
        feedDto.setFeedImg(feed.getFeedImg());             // 사료사진
        feedDto.setFeedName(feed.getFeedName());           // 사료이름
        feedDto.setFeedPrice(feed.getFeedPrice());         // 사료가격
        feedDto.setFeedSubscribe(feed.getFeedSubscribe()); // 판매수
        feedDto.setFeedType(feed.getFeedType());           // 사료타입 개/고양
        return feedDto;
    }
}
