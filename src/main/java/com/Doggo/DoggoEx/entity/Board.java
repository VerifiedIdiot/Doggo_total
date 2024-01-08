package com.Doggo.DoggoEx.entity;
import com.Doggo.DoggoEx.enums.BoardType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name = "board_tb")
@Getter
@Setter
@ToString
@NoArgsConstructor
public class Board {
    @Id
    @Column(name = "board_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "board_type", nullable = false)
    private BoardType boardType;

    @Column(name = "board_comment", nullable = false)
    private String comment;

    @Column(name = "board_img")
    private String boardImg;

    @ManyToOne(fetch = FetchType.LAZY) // 지연 전략
    @JoinColumn(name = "member_email") // 외래키
    private Member member; // 구매자

    @Column(name = "board_reg_date", nullable = false)
    private LocalDateTime regDate;
    @PrePersist
    protected void prePersist() {
        regDate = LocalDateTime.now();
    }

    @Column(name = "answer")
    private String answer;


}