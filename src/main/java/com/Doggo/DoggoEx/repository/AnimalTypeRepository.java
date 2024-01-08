package com.Doggo.DoggoEx.repository;

import com.Doggo.DoggoEx.entity.AnimalType;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface AnimalTypeRepository extends JpaRepository<AnimalType, Long> {

    Optional<AnimalType> findByAnimalType(AnimalType.AnimalTypes animalType);

    default void insertIfNotExist(Long id, AnimalType.AnimalTypes animalType) {
        findByAnimalType(animalType).orElseGet(() -> save(new AnimalType(id, animalType)));
    }
}
