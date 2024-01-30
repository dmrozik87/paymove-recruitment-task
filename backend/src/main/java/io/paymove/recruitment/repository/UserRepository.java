package io.paymove.recruitment.repository;

import io.paymove.recruitment.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

/**
 * Repository class extending JpaRepository to manipulate User entity
 */
@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    boolean existsByUserNameOrUserEmail(String username, String email);

    Optional<User> findByUserName(String username);
}
