package io.paymove.recruitment.repository;

import io.paymove.recruitment.model.Comment;
import io.paymove.recruitment.model.ImprovementProposal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;
import java.util.UUID;

@Repository
public interface CommentRepository extends JpaRepository<Comment, UUID> {

    Set<Comment> findCommentsByImprovementProposalOrderByCreatedAt(ImprovementProposal improvementProposal);
}
