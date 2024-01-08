package com.Doggo.DoggoEx.entity;
import com.Doggo.DoggoEx.enums.SalesType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "sale")
@Getter @Setter @ToString
@NoArgsConstructor
public class Sale {

    @Id
    @Column(name = "sales_num")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id; //구매 넘버

    @Column(name = "sales_name")
    private String salesName; //상품명

    @Column(name = "sales_price")
    private Integer salesPrice; //구매 가격

    @ManyToOne(fetch = FetchType.LAZY) // 지연 전략
    @JoinColumn(name = "member_id") // 외래키
    private Member member; // 구매자

    @Column(name = "sales_addr")
    private String salesAddr;  //배송지

    @ManyToOne(fetch = FetchType.LAZY) // 지연 전략
    @JoinColumn(name = "feed_num") // 외래키
    private Feed feed; // 사료

    @Enumerated(EnumType.STRING)
    @Column(name = "sales_type",nullable = false)
    private SalesType salesType; //구매종류

    @Column(name = "sales_regdate")
    private LocalDate salesRegDate; // 구매일자

    @Column(name = "sales_delivery")
    private LocalDate salesDelivery; //배송일자

    @Column(name = "sales_autodelivery")
    private Integer salesAutoDelivery; //정기 배송일자 10일이면>>10으로표시

    @PrePersist
    public void prePersist() {
        salesRegDate = LocalDate.now();
    }

    @Column(name = "order_status")
    private String orderStatus;

    @Column(name = "invoice_Num")
    private Integer invoice;

}
