package com.Doggo.DoggoEx.entity;

import com.Doggo.DoggoEx.dto.CatDto;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;


import javax.persistence.*;

@Entity
@Table(name = "cat_tb")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
@DynamicInsert
public class Cat {
    @Id
    @Column(name = "cat_id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "cat_seq")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "animal_type_id", referencedColumnName = "animal_type_id")
    private AnimalType animalTypeId;

    @Column(unique = true)
    private String name;

    @Column(unique = true)
    private String koreanName;

    private String imageLink;

    private String origin;

    private String length;

    @Column(columnDefinition = "integer default 1")
    private int intelligence;

    public void setIntelligence(Integer intelligence) {
        this.intelligence = (intelligence == null || intelligence == 0) ? 1 : intelligence;
    }

    @Column(columnDefinition = "integer default 1")
    private int familyFriendly;

    public void setFamilyFriendly(Integer familyFriendly) {
        this.familyFriendly = (familyFriendly == null || familyFriendly == 0) ? 1 : familyFriendly;
    }

    @Column(columnDefinition = "integer default 1")
    private int childrenFriendly;

    public void setChildrenFriendly(Integer childrenFriendly) {
        this.childrenFriendly = (childrenFriendly == null || childrenFriendly == 0) ? 1 : childrenFriendly;
    }

    @Column(columnDefinition = "integer default 1")
    private int strangerFriendly;

    public void setStrangerFriendly(Integer strangerFriendly) {
        this.strangerFriendly = (strangerFriendly == null || strangerFriendly == 0) ? 1 : strangerFriendly;
    }

    @Column(columnDefinition = "integer default 1")
    private int otherPetsFriendly;

    public void setOtherPetsFriendly(Integer otherPetsFriendly) {
        this.otherPetsFriendly = (otherPetsFriendly == null || otherPetsFriendly == 0) ? 1 : otherPetsFriendly;
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
    private int meowing;

    public void setMeowing(Integer meowing) {
        this.meowing = (meowing == null || meowing == 0) ? 1 : meowing;
    }

    @Column(columnDefinition = "integer default 1")
    private int generalHealth;

    public void setGeneralHealth(Integer generalHealth) {
        this.generalHealth = (generalHealth == null || generalHealth == 0) ? 1 : generalHealth;
    }

    @Column(columnDefinition = "integer default 1")
    private int playfulness;

    public void setPlayfulness(Integer playfulness) {
        this.playfulness = (playfulness == null || playfulness == 0) ? 1 : playfulness;
    }

    private int minWeight;

    private int maxWeight;

    private int minLifeExpectancy;

    private int maxLifeExpectancy;




    public CatDto toDto() {
        return CatDto.builder()
                .id(this.getId())
                .animalType(this.getAnimalTypeId())
                .name(this.getName())
                .koreanName(this.getKoreanName())
                .imageLink(this.getImageLink())
                .origin((this.getOrigin()))
                .length(this.getLength())
                .intelligence(this.getIntelligence())
                .familyFriendly(this.getFamilyFriendly())
                .childrenFriendly(this.getChildrenFriendly())
                .strangerFriendly(this.getStrangerFriendly())
                .otherPetsFriendly(this.getOtherPetsFriendly())
                .shedding(this.getShedding())
                .grooming(this.getGrooming())
                .meowing(this.getMeowing())
                .generalHealth(this.getGeneralHealth())
                .playfulness(this.getPlayfulness())
                .minWeight(this.getMinWeight())
                .maxWeight(this.getMaxWeight())
                .minWeight(this.getMinLifeExpectancy())
                .maxWeight(this.getMaxLifeExpectancy())
                .build();
    }

}
