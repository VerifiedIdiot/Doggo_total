package com.Doggo.DoggoEx.dto;

import com.Doggo.DoggoEx.enums.FeedType;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class FeedDto {
    private Long feedId;
    private String feedName;    // 사료이름
    private String feedImg;     // 사료사진
    private Integer feedPrice;  // 사료가격
    private String feedInfo;    // 사료정보
    private FeedType feedType;  // 사료타입 개/고양
    private Integer feedSubscribe;   // 판매수
}
