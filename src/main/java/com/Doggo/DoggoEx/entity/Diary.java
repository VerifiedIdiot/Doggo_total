package com.Doggo.DoggoEx.entity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;


@Entity
@Table(name = "diary")
@Getter
@Setter
@ToString
@NoArgsConstructor
public class Diary {

    @Id
    @Column(name = "diary_num")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "diary_title",nullable = false)
    private String diaryTitle; //제목

    @Column(name = "diary_detail",length = 1000)
    private String diaryDetail; // 내용

    @Column(name = "diary_write_date",nullable = false)
    private LocalDate diaryWriteDate; //작성일자

    @ManyToOne(fetch = FetchType.LAZY) // 지연 전략
    @JoinColumn(name = "member_id") // 외래키
    private Member member; // 작성자


}
