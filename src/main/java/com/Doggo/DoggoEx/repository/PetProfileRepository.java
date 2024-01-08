package com.Doggo.DoggoEx.repository;

import com.Doggo.DoggoEx.entity.Member;
import com.Doggo.DoggoEx.entity.PetProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PetProfileRepository extends JpaRepository<PetProfile, Long> {
    List<PetProfile> findByMemberMemberEmail(String memberEmail);
}
