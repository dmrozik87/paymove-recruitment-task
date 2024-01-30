package io.paymove.recruitment.controller;

import io.paymove.recruitment.model.ImprovementProposal;
import io.paymove.recruitment.service.ImprovementProposalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Set;
import java.util.UUID;

/**
 * The controller for REST endpoints related to ImprovementProposal entity.
 */
@RestController
@RequestMapping("/improvement-proposals")
@RequiredArgsConstructor
public class ImprovementProposalController {

    private final ImprovementProposalService improvementProposalService;

    /**
     * Creates new improvement proposal for user with given ID
     * @param userId UUID of a user who creates new improvement proposal
     * @return ResponseEntity with new ImprovementProposal object
     */
    @PostMapping("/{userId}")
    public ResponseEntity<ImprovementProposal> createImprovementProposal(@PathVariable UUID userId) {
        ImprovementProposal newIp = improvementProposalService.createNewImprovementProposal(userId);
        return ResponseEntity.ok(newIp);
    }

    /**
     * Gets improvement proposal with given ID
     * @param ipId UUID of improvement proposal to find
     * @return ResponseEntity with ImprovementProposal object
     */
    @GetMapping("/{ipId}")
    public ResponseEntity<ImprovementProposal> getImprovementProposalById(@PathVariable UUID ipId) {
        Optional<ImprovementProposal> improvementProposalOptional = improvementProposalService.getImprovementProposalById(ipId);

        if (improvementProposalOptional.isPresent()) return ResponseEntity.ok(improvementProposalOptional.get());
        return ResponseEntity.badRequest().build();
    }

    /**
     * Updates given improvement proposal
     * @param improvementProposal improvement proposal object with updated value
     * @return ResponseEntity with updated ImprovementProposal object
     */
    @PutMapping("/")
    public ResponseEntity<ImprovementProposal> updateImprovementProposal(@RequestBody ImprovementProposal improvementProposal) {
        ImprovementProposal updatedImprovementProposal = improvementProposalService.save(improvementProposal);
        return ResponseEntity.ok(updatedImprovementProposal);
    }

    /**
     * Gets improvement proposals created by user with given ID
     * @param userId UUID of improvement proposals created
     * @return ResponseEntity with set of ImprovementProposal objects
     */
    @GetMapping("/by-user/{userId}")
    public ResponseEntity<Set<ImprovementProposal>> getImprovementProposalsByUserId(@PathVariable UUID userId) {
        return ResponseEntity.ok(improvementProposalService.findImprovementProposalsByUserId(userId));
    }

    /**
     * Deletes improvement proposal with given ID
     * @param ipId UUID of improvement proposal to delete
     * @return ResponseEntity with empty body
     */
    @DeleteMapping("/{ipId}")
    public ResponseEntity<ImprovementProposal> deleteImprovementProposalById(@PathVariable UUID ipId) {
        improvementProposalService.deleteImprovementProposalById(ipId);
        return ResponseEntity.ok(null);
    }

    /**
     * Gets improvement proposals for reviewer: with given reviewer ID or with "Submitted" status
     * @param reviewerId UUID of user who is reviewer
     * @return ResponseEntity with set of ImprovementProposal objects
     */
    @GetMapping("/for-review/{reviewerId}")
    public ResponseEntity<Set<ImprovementProposal>> getImprovementProposalsForReviewer(@PathVariable UUID reviewerId) {
        return ResponseEntity.ok(improvementProposalService.getImprovementProposalsForReviewer(reviewerId));
    }
}
