package com.Doggo.DoggoEx.enums;


import lombok.*;

@Getter

public enum RegionEnum {

    SEOUL_GYEONGGI("서울.인천.경기"),
    JEJU("제주도"),
    CHUNGCHEONG_BUKDO("충청북도"),
    CHUNGCHEONG_NAMDO("충청남도"),
    GANGWON_YOUNGSEO("강원영서"),
    GANGWON_YOUNGDONG("강원영동"),
    JEOLLA_BUKDO("전라북도"),
    JEOLLA_NAMDO("전라남도"),
    GYEONGSANG_BUKDO("경상북도"),
    GYEONGSANG_NAMDO("경상남도");

    private final String regionName;

    RegionEnum(String regionName) {

        this.regionName = regionName;
    }

}
