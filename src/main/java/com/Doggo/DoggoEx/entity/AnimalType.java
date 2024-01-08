package com.Doggo.DoggoEx.entity;


import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import javax.persistence.*;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "animal_type_tb")
public class AnimalType {
    @Id
    @Column(name = "animal_type_id")
    private Long id;


    @Enumerated(EnumType.STRING)
    @Column(name = "animalType")
    private AnimalTypes animalType;



    public enum AnimalTypes {
        DOG,
        CAT
    }
    public AnimalType(long id) {
        this.id = id;
    }


}


