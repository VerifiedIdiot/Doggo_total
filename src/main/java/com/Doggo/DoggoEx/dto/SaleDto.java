package com.Doggo.DoggoEx.dto;


import com.Doggo.DoggoEx.enums.SalesType;
import lombok.*;


import java.time.LocalDate;

@Getter @Setter @ToString
@NoArgsConstructor
@AllArgsConstructor
public class SaleDto {
    private Long saleId; //구매 넘버
    private String salesName; //구매명
    private Integer salesPrice; //구매 가격
    private String memberId; // 구매자
    private String salesAddr;  //배송지
    private String feedName; // 사료이름
    private SalesType salesType; //구매종류
    private LocalDate salesRegDate; // 구매일자
    private LocalDate salesDelivery; //배송일자
    private Integer salesAutoDelivery; //정기 배송일자 10일이면>>10으로표시

    private String orderStatus;     // 출고상태
    private Integer invoice;         // 송장번호
}
