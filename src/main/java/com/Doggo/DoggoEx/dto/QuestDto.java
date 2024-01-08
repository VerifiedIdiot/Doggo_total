package com.Doggo.DoggoEx.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class QuestDto {
    private Long questId;
    private Boolean quest1; //양치
    private Boolean quest2; //산책
    private Boolean quest3; //교감
    private Boolean quest4; //1분건강
    private Boolean quest5; //빗질
    private Long PetId; //펫 아이디
    private String petImg;
    private LocalDate questPerformance; //날짜

    public int calculatePercent() {
        int cnt = 0;
        if (quest1) { cnt++; }
        if (quest2) { cnt++; }
        if (quest3) { cnt++; }
        if (quest4) { cnt++; }
        if (quest5) { cnt++; }
        return cnt * 20;
    }
}
