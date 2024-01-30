package io.paymove.recruitment.service;

import io.paymove.recruitment.model.ImprovementProposal;
import io.paymove.recruitment.model.User;
import io.paymove.recruitment.repository.ImprovementProposalRepository;
import io.paymove.recruitment.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ImprovementProposalService {

    private final ImprovementProposalRepository improvementProposalRepository;
    private final UserRepository userRepository;

    public ImprovementProposal createNewImprovementProposal(UUID userId) {

        User user = userRepository.findById(userId).get();

        ImprovementProposal improvementProposal = ImprovementProposal.builder()
                .ipId(UUID.randomUUID())
                .user(user)
                .status("Pending Submission")
                .build();

        return improvementProposalRepository.save(improvementProposal);
    }

    public Optional<ImprovementProposal> getImprovementProposalById(UUID ipId) {
        return improvementProposalRepository.findById(ipId);
    }

    public ImprovementProposal save(ImprovementProposal improvementProposal) {
        return improvementProposalRepository.save(improvementProposal);
    }

    public Set<ImprovementProposal> findImprovementProposalsByUserId(UUID userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        return improvementProposalRepository.findImprovementProposalsByUser(optionalUser.get());
    }

    public void deleteImprovementProposalById(UUID ipId) {
        improvementProposalRepository.deleteById(ipId);
    }

    public Set<ImprovementProposal> getImprovementProposalsForReviewer(UUID reviewerId) {
        User reviewer = userRepository.findById(reviewerId).get();
        return improvementProposalRepository.findImprovementProposalByStatusEqualsOrReviewer("Submitted", reviewer);
    }
}
