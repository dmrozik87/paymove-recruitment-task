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

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final ImprovementProposalRepository improvementProposalRepository;

    public Comment createComment(Comment comment) {
        comment.setCreatedAt(LocalDateTime.now());
        return commentRepository.save(comment);
    }

    public Set<Comment> getCommentsByIpId(UUID ipId) {
        ImprovementProposal improvementProposal = improvementProposalRepository.findById(ipId).get();
        return commentRepository.findCommentsByImprovementProposalOrderByCreatedAt(improvementProposal);
    }
}
