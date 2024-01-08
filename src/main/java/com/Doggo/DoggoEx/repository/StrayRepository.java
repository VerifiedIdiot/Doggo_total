package com.Doggo.DoggoEx.repository;


import com.Doggo.DoggoEx.entity.Dog;
import com.Doggo.DoggoEx.entity.Stray;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StrayRepository extends JpaRepository<Stray, Long> {

    List<Stray> findAllByRegion(String region);
}
