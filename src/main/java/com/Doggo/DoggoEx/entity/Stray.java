package com.Doggo.DoggoEx.entity;

import com.Doggo.DoggoEx.dto.StrayDto;
import com.Doggo.DoggoEx.dto.WeatherDto;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "stray_tb")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class Stray {
    @Id
    @Column(name = "stray_id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "stray_seq")
    private Long id;

    private String region;

    private String city;

    private String breed;

    private Long animalNumber;

    private String imageLink;

    public StrayDto toDto() {
        return StrayDto.builder()
                .id(this.getId())
                .region(this.getRegion())
                .city(this.getCity())
                .breed(this.getBreed())
                .animalNumber(this.getAnimalNumber())
                .imageLink(this.getImageLink())
                .build();
    }

}
