package com.Doggo.DoggoEx.entity;
import com.Doggo.DoggoEx.dto.DogDto;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@Entity
@Table(name = "dog_tb")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
@DynamicInsert
public class Dog {
    @Id
    @Column(name = "dog_id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "dog_seq")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "animal_type_id", referencedColumnName = "animal_type_id")
    private AnimalType animalTypeId;

    @Column(unique = true)
    private String name;

    @Column(unique = true)
    private String koreanName;

    private String imageLink;

    @Column(columnDefinition = "integer default 1")
    private int goodWithChildren;
    public void setGoodWithChildren(Integer goodWithChildren) {
        this.goodWithChildren = (goodWithChildren == null || goodWithChildren == 0) ? 1 : goodWithChildren;
    }

    @Column(columnDefinition = "integer default 1")
    private int goodWithOtherDogs;
    public void setGoodWithOtherDogs(Integer goodWithOtherDogs) {
        this.goodWithOtherDogs = (goodWithOtherDogs == null || goodWithOtherDogs == 0) ? 1 : goodWithOtherDogs;
    }

    @Column(columnDefinition = "integer default 1")
    private int shedding;
    public void setShedding(Integer shedding) {
        this.shedding = (shedding == null || shedding == 0) ? 1 : shedding;
    }

    @Column(columnDefinition = "integer default 1")
    private int grooming;
    public void setGrooming(Integer grooming) {
        this.grooming = (grooming == null || grooming == 0) ? 1 : grooming;
    }

    @Column(columnDefinition = "integer default 1")
    private int drooling;
    public void setDrooling(Integer drooling) {
        this.drooling = (drooling == null || drooling == 0) ? 1 : drooling;
    }

    @Column(columnDefinition = "integer default 1")
    private int coatLength;
    public void setCoatLength(Integer coatLength) {
        this.coatLength = (coatLength == null || coatLength == 0) ? 1 : coatLength;
    }

    @Column(columnDefinition = "integer default 1")
    private int goodWithStrangers;
    public void setGoodWithStrangers(Integer goodWithStrangers) {
        this.goodWithStrangers = (goodWithStrangers == null || goodWithStrangers == 0) ? 1 : goodWithStrangers;
    }

    @Column(columnDefinition = "integer default 1")
    private int playfulness;
    public void setPlayfulness(Integer playfulness) {
        this.playfulness = (playfulness == null || playfulness == 0) ? 1 : playfulness;
    }

    @Column(columnDefinition = "integer default 1")
    private int protectiveness;
    public void setProtectiveness(Integer protectiveness) {
        this.protectiveness = (protectiveness == null || protectiveness == 0) ? 1 : protectiveness;
    }

    @Column(columnDefinition = "integer default 1")
    private int trainability;
    public void setTrainability(Integer trainability) {
        this.trainability = (trainability == null || trainability == 0) ? 1 : trainability;
    }

    @Column(columnDefinition = "integer default 1")
    private int energy;
    public void setEnergy(Integer energy) {
        this.energy = (energy == null || energy == 0) ? 1 : energy;
    }

    @Column(columnDefinition = "integer default 1")
    private int barking;
    public void setBarking(Integer barking) {
        this.barking = (barking == null || barking == 0) ? 1 : barking;
    }


    private int minLifeExpectancy;

    private int maxLifeExpectancy;

    private int minHeightMale;

    private int maxHeightMale;

    private int minHeightFemale;

    private int maxHeightFemale;

    private int minWeightMale;

    private int maxWeightMale;

    private int minWeightFemale;

    private int maxWeightFemale;




    public DogDto toDto() {
        return DogDto.builder()
                .id(this.getId()) // ID 포함 시키는 것에 대해 주의 필요 (컨텍스트에 따라 다름)
                .name(this.getName())
                .koreanName(this.getKoreanName())
                .imageLink(this.getImageLink())
                .goodWithChildren(this.getGoodWithChildren())
                .goodWithOtherDogs(this.getGoodWithOtherDogs())
                .shedding(this.getShedding())
                .grooming(this.getGrooming())
                .drooling(this.getDrooling())
                .coatLength(this.getCoatLength())
                .goodWithStrangers(this.getGoodWithStrangers())
                .playfulness(this.getPlayfulness())
                .protectiveness(this.getProtectiveness())
                .trainability(this.getTrainability())
                .energy(this.getEnergy())
                .barking(this.getBarking())
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
