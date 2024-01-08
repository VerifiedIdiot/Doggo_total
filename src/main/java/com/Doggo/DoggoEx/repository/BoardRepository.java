package com.Doggo.DoggoEx.repository;

import com.Doggo.DoggoEx.entity.Board;
import com.Doggo.DoggoEx.entity.Sale;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BoardRepository extends JpaRepository<Board, Long> {
    List<Board> findByMemberMemberEmail(String memberEmail);
    Page<Board> findByAnswerContaining(String filter, Pageable pageable);
    Page<Board> findByAnswerIsNotNull(Pageable pageable);
    Page<Board> findByAnswerIsNull(Pageable pageable);
}