package com.Doggo.DoggoEx.repository;

import com.Doggo.DoggoEx.entity.Weather;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WeatherRepository extends JpaRepository <Weather, Long> {
}
