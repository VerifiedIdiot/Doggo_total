package com.Doggo.DoggoEx.dto;

import com.Doggo.DoggoEx.entity.AnimalType;
import com.Doggo.DoggoEx.entity.Member;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class PetProfileDto {
    private Long id;
    private String memberId;
    private AnimalType animalType; // 동물의 종류 (Enum 참조)
    private String petName; // 동물의 이름
    private String breed;
    private String gender;
    private String imageLink;
    private String detail;
    private LocalDate birthDate;
    private LocalDateTime regDate; // 생성일
}

