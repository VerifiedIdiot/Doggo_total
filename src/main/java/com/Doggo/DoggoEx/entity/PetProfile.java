package com.Doggo.DoggoEx.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "pet_profile_tb")
@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class PetProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "pet_profile_seq")
    @Column(name = "pet_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "member_email")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "animal_type_id")
    private AnimalType animalType; // 동물의 종류 (Enum 참조)

    private String petName; // 동물의 이름
    private String breed;
    private String gender;
    private String imageLink;
    private String detail;
    private LocalDate birthDate;
    private LocalDateTime regDate; // 생성일

    @PrePersist
    protected void prePersist() {
        regDate = LocalDateTime.now();
    }

    @OneToMany(mappedBy = "petProfile",cascade = CascadeType.ALL)
    private List<Quest> quests;
}