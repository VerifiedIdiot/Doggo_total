package com.Doggo.DoggoEx.entity;
import com.Doggo.DoggoEx.enums.FeedType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "feed")
@Getter
@Setter
@ToString
@NoArgsConstructor
public class Feed {
    @Id
    @Column(name = "feed_num")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(name = "feed_name",nullable = false)
    private String feedName;    // 사료이름
    @Column(name = "feed_img",nullable = false, length = 2048)
    private String feedImg;     // 사료사진
    @Column(name = "feed_price",nullable = false)
    private Integer feedPrice;   // 사료가격
    @Column(name = "feed_info",nullable = false)
    private String feedInfo;    // 사료정보
    @Enumerated(EnumType.STRING)
    @Column(name = "feed_type",nullable = false)
    private FeedType feedType;  // 사료타입 개/고양이
    @Column(name = "feed_subscribe",nullable = false)
    private Integer feedSubscribe;   // 판매수
    @OneToMany(mappedBy = "feed", cascade = CascadeType.ALL)
    private List<Sale> sale;

}
