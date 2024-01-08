package com.Doggo.DoggoEx.dto;


import lombok.*;

import java.time.LocalDate;


@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class DiaryDto {
    private Long diaryId;
    private String diaryTitle; //제목
    private String diaryDetail; // 내용
    private LocalDate diaryWriteDate; //작성일자
    private String memberId; // 작성자
}
