package com.Doggo.DoggoEx.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class CalenderDto {
    //캘린더 전용 간략 리스트 뽑는 용
    private LocalDate Date; //작성일자
    private String diaryDetail; //일기 내역
    private Integer Percent; // 총 퀘스트 수행퍼센트
}
