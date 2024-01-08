package com.Doggo.DoggoEx.repository;

import com.Doggo.DoggoEx.entity.Diary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;


@Repository
public  interface DiaryRepository extends JpaRepository<Diary, Long> {
    Diary findByMemberMemberEmailAndDiaryWriteDate (String email, LocalDate date);
    Boolean existsByMemberMemberEmailAndDiaryWriteDate(String email, LocalDate date);
    List<Diary> findByMemberMemberEmail(String email);

}
