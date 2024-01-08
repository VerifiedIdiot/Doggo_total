package com.Doggo.DoggoEx.repository;

import com.Doggo.DoggoEx.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository <Member, Long> {
    Optional<Member> findByMemberEmail(String email);
    boolean existsByMemberEmail(String email);

    Optional<Member> findByMemberNameAndMemberTel(String Name, String Tel);

    void deleteByMemberEmail(String email);
    Optional<Member> findByMemberEmailAndMemberPassword(String email, String password);

    Page<Member> findByMemberGradeContaining(String filter, Pageable pageable);
    Page<Member> findByMemberGradeIsNull(Pageable pageable);
}
