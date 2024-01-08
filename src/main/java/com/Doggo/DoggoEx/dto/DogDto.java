package com.Doggo.DoggoEx.dto;

import com.Doggo.DoggoEx.utils.Views;
import com.Doggo.DoggoEx.entity.Dog;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.*;

@Getter @Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
// JsonProperty는 개발자가 해당 제이슨 객체의 대응되는 dto 변수를 직접 명시하여
// 서비스영역에서 빈 배열이나 빈 맵에 제이슨 객체를 넣었다가 dto에 일일이 전달하는 공정을 줄여줌

// JsonNaming 어노테이션을 사용하는 경우 , JSON 객체의 스네이크 표기법에 맞춰 dto 변수명을 카멜 케이스로 지정해 놓으면
// 스프링이 알아서 스네이크 <> 카멜표기로 일치하는것을 판별하여 매핑해줌 !!
// 그러나 직관적이게 내비두고 싶어서 JsonProperty를 사용하였음



// JsonInclude는 필드의 값이 NULL인 경우 JSON 직렬화 대상에서 누락시킴
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
//@JsonInclude(JsonInclude.Include.NON_DEFAULT)
public class DogDto {
    @JsonView(Views.Public.class)
    // @JsonIgnore 원래는 제외 대상이었는데 로직변경으로 변동됨
    private long id; // DB에서 사용할 ID, JSON 매핑 제외

    // JsonView로 명시해 놓으면 RestController 측 메서드에 해당 어노테이션을
    // 명시해놓으면 해당 필드만 Json 직렬화 처리됨 개꿀띠
    @JsonView(Views.Public.class)
//    @JsonProperty("name")
    private String name;

    @JsonView(Views.Public.class)
//    @JsonProperty("korean_name")
    private String koreanName;

    @JsonView(Views.Public.class)
//    @JsonProperty("image_link")
    private String imageLink;

//    @JsonProperty("good_with_children")
    private int goodWithChildren;

//    @JsonProperty("good_with_other_dogs")
    private int goodWithOtherDogs;

//    @JsonProperty("shedding")
    private int shedding;

//    @JsonProperty("grooming")
    private int grooming;

//    @JsonProperty("drooling")
    private int drooling;

//    @JsonProperty("coat_length")
    private int coatLength;

//    @JsonProperty("good_with_strangers")
    private int goodWithStrangers;

//    @JsonProperty("playfulness")
    private int playfulness;

//    @JsonProperty("protectiveness")
    private int protectiveness;

//    @JsonProperty("trainability")
    private int trainability;

//    @JsonProperty("energy")
    private int energy;

//    @JsonProperty("barking")
    private int barking;

//    @JsonProperty("min_life_expectancy")
    private int minLifeExpectancy;

//    @JsonProperty("max_life_expectancy")
    private int maxLifeExpectancy;

//    @JsonProperty("max_height_male")
    private int maxHeightMale;

//    @JsonProperty("max_height_female")
    private int maxHeightFemale;

//    @JsonProperty("max_weight_male")
    private int maxWeightMale;

//    @JsonProperty("max_weight_female")
    private int maxWeightFemale;

//    @JsonProperty("min_height_male")
    private int minHeightMale;

//    @JsonProperty("min_height_female")
    private int minHeightFemale;

//    @JsonProperty("min_weight_male")
    private int minWeightMale;

//    @JsonProperty("min_weight_female")
    private int minWeightFemale;


    // @Query 어노테이션과 조합하기 위해서는 빌더가 아닌 생성자가 필요하다더라....
    public DogDto(Long id, String name,String koreanName, String imageLink) {
        this.id = id;
        this.name = name;
        this.koreanName = koreanName;
        this.imageLink = imageLink;

    }


    // builder를 통해서 반복된 getter setter 사용 방지 , @Query 어노테이션이랑 호환 안됨
    public Dog toEntity() {
        return Dog.builder()
                .name(this.getName())
                .koreanName(this.getKoreanName())
                .imageLink(this.getImageLink())
                .goodWithChildren(this.getGoodWithChildren() == 0 ? 1 : this.getGoodWithChildren())
                .goodWithOtherDogs(this.getGoodWithOtherDogs() == 0 ? 1 : this.getGoodWithOtherDogs())
                .shedding(this.getShedding() == 0 ? 1 : this.getShedding())
                .grooming(this.getGrooming() == 0 ? 1 : this.getGrooming())
                .drooling(this.getDrooling() == 0 ? 1 : this.getDrooling())
                .coatLength(this.getCoatLength() == 0 ? 1 : this.getCoatLength())
                .goodWithStrangers(this.getGoodWithStrangers() == 0 ? 1 : this.getGoodWithStrangers())
                .playfulness(this.getPlayfulness() == 0 ? 1 : this.getPlayfulness())
                .protectiveness(this.getProtectiveness() == 0 ? 1 : this.getProtectiveness())
                .trainability(this.getTrainability() == 0 ? 1 : this.getTrainability())
                .energy(this.getEnergy() == 0 ? 1 : this.getEnergy())
                .barking(this.getBarking() == 0 ? 1 : this.getBarking())
                .minLifeExpectancy(this.getMinLifeExpectancy())
                .maxLifeExpectancy(this.getMaxLifeExpectancy())
                .minHeightMale(this.getMinHeightMale())
                .maxHeightMale(this.getMaxHeightMale())
                .minHeightFemale(this.getMinHeightFemale())
                .maxHeightFemale(this.getMaxHeightFemale())
                .minWeightMale(this.getMinWeightMale())
                .maxWeightMale(this.getMaxWeightMale())
                .minWeightFemale(this.getMinWeightFemale())
                .maxWeightFemale(this.getMaxWeightFemale())
                .build();
    }


}
