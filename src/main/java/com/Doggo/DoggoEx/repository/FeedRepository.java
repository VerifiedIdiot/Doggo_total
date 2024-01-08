package com.Doggo.DoggoEx.repository;

import com.Doggo.DoggoEx.entity.Feed;
import com.Doggo.DoggoEx.enums.FeedType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FeedRepository extends JpaRepository<Feed, Long> {
    Optional<Feed> findByFeedName(String name);
    List<Feed> findByFeedType(FeedType feedType);
    Page<Feed> findByFeedType(FeedType feedType, Pageable pageable);

}
