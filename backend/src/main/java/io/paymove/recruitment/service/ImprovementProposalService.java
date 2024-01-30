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

/**
 * Service class for encapsulating logic related to manipulating improvement proposals
 */
@Service
@RequiredArgsConstructor
public class ImprovementProposalService {

    private final ImprovementProposalRepository improvementProposalRepository;
    private final UserRepository userRepository;

    /**
     * Creates new improvement proposal, sets user with given ID as creator and sets initial status
     * @param userId UUID of user who is an author of improvement proposal
     * @return ImprovementProposal object
     */
    public ImprovementProposal createNewImprovementProposal(UUID userId) {

        User user = userRepository.findById(userId).get();

        ImprovementProposal improvementProposal = ImprovementProposal.builder()
                .ipId(UUID.randomUUID())
                .user(user)
                .status("Pending Submission")
                .build();

        return improvementProposalRepository.save(improvementProposal);
    }

    /**
     * Finds improvement proposal for given ID
     * @param ipId UUID of improvement proposal to find
     * @return Optional of ImprovementProposal object
     */
    public Optional<ImprovementProposal> getImprovementProposalById(UUID ipId) {
        return improvementProposalRepository.findById(ipId);
    }

    /**
     * Saves improvement proposal
     * @param improvementProposal ImprovementProposal object to save
     * @return ImprovementProposal object
     */
    public ImprovementProposal save(ImprovementProposal improvementProposal) {
        return improvementProposalRepository.save(improvementProposal);
    }

    /**
     * Finds improvement proposal created by user with given ID
     * @param userId UUID of user who is an author of improvement proposals
     * @return set of ImprovementProposal objects
     */
    public Set<ImprovementProposal> findImprovementProposalsByUserId(UUID userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        return improvementProposalRepository.findImprovementProposalsByUser(optionalUser.get());
    }

    /**
     * Deletes improvement proposal with given ID
     * @param ipId UUID of improvement proposal to delete
     */
    public void deleteImprovementProposalById(UUID ipId) {
        improvementProposalRepository.deleteById(ipId);
    }

    /**
     * Gets improvement proposals for reviewer: with given reviewer ID or with "Submitted" status
     * @param reviewerId UUID of user who is a reviewer
     * @return set of ImprovementProposal objects
     */
    public Set<ImprovementProposal> getImprovementProposalsForReviewer(UUID reviewerId) {
        User reviewer = userRepository.findById(reviewerId).get();
        return improvementProposalRepository.findImprovementProposalByStatusEqualsOrReviewer("Submitted", reviewer);
    }
}
