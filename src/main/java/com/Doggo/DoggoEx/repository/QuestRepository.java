package com.Doggo.DoggoEx.repository;


import com.Doggo.DoggoEx.entity.Quest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface QuestRepository extends JpaRepository<Quest, Long> {
    boolean existsByPetProfileIdAndQuestPerformance(long id, LocalDate QuestPerformance);
    Quest findByPetProfileIdAndQuestPerformance (Long PetId, LocalDate day);
    List<Quest> findByPetProfileId(long id);

}
