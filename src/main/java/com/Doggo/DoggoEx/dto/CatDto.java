package com.Doggo.DoggoEx.dto;

import com.Doggo.DoggoEx.utils.Views;
import com.Doggo.DoggoEx.entity.AnimalType;
import com.Doggo.DoggoEx.entity.Cat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.*;

@Getter @Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder

@JsonInclude(JsonInclude.Include.NON_NULL)
public class CatDto {
    @JsonView(Views.Public.class)
    // @JsonIgnore 원래는 제외 대상이었는데 로직변경으로 변동됨
    private long id;

    // JsonView로 명시해 놓으면 RestController 측 메서드에 해당 어노테이션을
    // 명시해놓을시 해당 필드만 Json 직렬화 처리됨 개꿀띠
    @JsonView(Views.Public.class)
    @JsonProperty("name")
    private String name;

    @JsonView(Views.Public.class)
    @JsonProperty("korean_name")
    private String koreanName;

    @JsonView(Views.Public.class)
    @JsonProperty("image_link")
    private String imageLink;

    @JsonProperty("family_friendly")
    private int familyFriendly;


    @JsonProperty("shedding")
    private int shedding;


    @JsonProperty("general_health")
    private int generalHealth;


    @JsonProperty("playfulness")
    private int playfulness;


    @JsonProperty("children_friendly")
    private int childrenFriendly;


    @JsonProperty("stranger_friendly")
    private int strangerFriendly;


    @JsonProperty("grooming")
    private int grooming;

    @JsonProperty("meowing")
    private int meowing;

    @JsonProperty("intelligence")
    private int intelligence;


    @JsonProperty("other_pets_friendly")
    private int otherPetsFriendly;


    @JsonProperty("min_weight")
    private int minWeight;


    @JsonProperty("max_weight")
    private int maxWeight;


    @JsonProperty("min_life_expectancy")
    private int minLifeExpectancy;


    @JsonProperty("max_life_expectancy")
    private int maxLifeExpectancy;


    @JsonProperty("origin")
    private String origin;


    @JsonProperty("length")
    private String length;

    private AnimalType animalType;

    // @Query 어노테이션과 조합하기 위해서는 빌더가 아닌 생성자가 필요하다더라....
    public CatDto(Long id, String name,String koreanName, String imageLink) {
        this.id = id;
        this.name = name;
        this.koreanName = koreanName;
        this.imageLink = imageLink;

    }


    // builder를 통해서 반복된 getter setter 사용 방지 , @Query 어노테이션이랑 호환 안됨
    //
    public Cat toEntity() {
        return Cat.builder()
                .name(this.getName())
                .koreanName(this.getKoreanName())
                .animalTypeId(this.getAnimalType())
                .imageLink(this.getImageLink())
                .origin((this.getOrigin()))
                .length(this.getLength())
                .intelligence(this.getIntelligence() == 0 ? 1 : this.getIntelligence())
                .familyFriendly(this.getFamilyFriendly() == 0 ? 1 : this.getFamilyFriendly())
                .childrenFriendly(this.getChildrenFriendly() == 0 ? 1 : this.getChildrenFriendly())
                .strangerFriendly(this.getStrangerFriendly() == 0 ? 1 : this.getStrangerFriendly())
                .otherPetsFriendly(this.getOtherPetsFriendly() == 0 ? 1 : this.getOtherPetsFriendly())
                .shedding(this.getShedding() == 0 ? 1 : this.getShedding())
                .grooming(this.getGrooming() == 0 ? 1 : this.getGrooming())
                .meowing(this.getMeowing() == 0 ? 1 : this.getMeowing())
                .generalHealth(this.getGeneralHealth() == 0 ? 1 : this.getGeneralHealth())
                .playfulness(this.getPlayfulness() == 0 ? 1 : this.getPlayfulness())
                .minWeight(this.getMinWeight())
                .maxWeight(this.getMaxWeight())
                .minLifeExpectancy(this.getMinLifeExpectancy())
                .maxLifeExpectancy(this.getMaxLifeExpectancy())
                .build();
    }
}
