package io.paymove.recruitment.repository;

import io.paymove.recruitment.model.ImprovementProposal;
import io.paymove.recruitment.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;
import java.util.UUID;

/**
 * Repository class extending JpaRepository to manipulate ImprovementProposal entity
 */
public interface ImprovementProposalRepository extends JpaRepository<ImprovementProposal, UUID> {
    Set<ImprovementProposal> findImprovementProposalsByUser(User user);

    Set<ImprovementProposal> findImprovementProposalByStatusEqualsOrReviewer(String status, User reviewer);

}
