package io.paymove.recruitment.service;

import io.paymove.recruitment.model.Comment;
import io.paymove.recruitment.model.ImprovementProposal;
import io.paymove.recruitment.repository.CommentRepository;
import io.paymove.recruitment.repository.ImprovementProposalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

/**
 * Service class for encapsulating logic related to getting and creating comments
 */
@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final ImprovementProposalRepository improvementProposalRepository;

    /**
     * Sets current date and time to Comment object and saves it
     * @param comment Comment object
     * @return new Comment object if saved successfully
     */
    public Comment createComment(Comment comment) {
        comment.setCreatedAt(LocalDateTime.now());
        return commentRepository.save(comment);
    }

    /**
     * Gets comments for improvement proposal with given ID
     * @param ipId UUID of improvement proposal for which comments are being retrieved
     * @return set of Comment objects
     */
    public Set<Comment> getCommentsByIpId(UUID ipId) {
        ImprovementProposal improvementProposal = improvementProposalRepository.findById(ipId).get();
        return commentRepository.findCommentsByImprovementProposalOrderByCreatedAt(improvementProposal);
    }

    /**
     * Deletes comment with specified id
     * @param commentId UUID of a comment to delete
     */
    public void deleteComment(UUID commentId) {
        commentRepository.deleteById(commentId);
    }
}
