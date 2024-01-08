package com.Doggo.DoggoEx.dto;

import com.Doggo.DoggoEx.entity.Stray;
import com.Doggo.DoggoEx.utils.Views;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.*;


@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
// null 값이 발생한 필드 자체를 누락시키는 어노테이션인데 ,, 위험하지않을까 해서 잠시 주석
//@JsonInclude(JsonInclude.Include.NON_NULL)
public class StrayDto {
//    @JsonView(Views.Public.class)
    private Long id;

    private String region;

    private String city;

    private String breed;

    private Long animalNumber;

    private String imageLink;
    public Stray toEntity() {
        return Stray.builder()
                .region(this.getRegion())
                .city(this.getCity())
                .breed(this.getBreed())
                .animalNumber(this.getAnimalNumber())
                .imageLink(this.getImageLink())
                .build();
    }
}
