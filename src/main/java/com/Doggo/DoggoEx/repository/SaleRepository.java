package com.Doggo.DoggoEx.repository;


import com.Doggo.DoggoEx.entity.Member;
import com.Doggo.DoggoEx.entity.Sale;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface SaleRepository extends JpaRepository <Sale, Long> {
    List<Sale> findByMemberMemberEmail(String email);
    Page<Sale> findByOrderStatusContaining(String filter, Pageable pageable);
}
