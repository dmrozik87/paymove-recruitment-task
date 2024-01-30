package io.paymove.recruitment.controller;

import io.paymove.recruitment.model.ImprovementProposal;
import io.paymove.recruitment.service.ImprovementProposalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@RestController
@RequestMapping("/improvement-proposals")
@RequiredArgsConstructor
public class ImprovementProposalController {

    private final ImprovementProposalService improvementProposalService;

    @PostMapping("/{userId}")
    public ResponseEntity<ImprovementProposal> createImprovementProposal(@PathVariable UUID userId) {
        ImprovementProposal newIp = improvementProposalService.createNewImprovementProposal(userId);
        return ResponseEntity.ok(newIp);
    }

    @GetMapping("/{ipId}")
    public ResponseEntity<ImprovementProposal> getImprovementProposalById(@PathVariable UUID ipId) {
        Optional<ImprovementProposal> improvementProposalOptional = improvementProposalService.getImprovementProposalById(ipId);

        if (improvementProposalOptional.isPresent()) return ResponseEntity.ok(improvementProposalOptional.get());
        return ResponseEntity.badRequest().build();
    }

    @PutMapping("/")
    public ResponseEntity<ImprovementProposal> updateImprovementProposal(@RequestBody ImprovementProposal improvementProposal) {
        ImprovementProposal updatedImprovementProposal = improvementProposalService.save(improvementProposal);
        return ResponseEntity.ok(updatedImprovementProposal);
    }

    @GetMapping("/by-user/{userId}")
    public ResponseEntity<Set<ImprovementProposal>> getImprovementProposalsByUserId(@PathVariable UUID userId) {
        return ResponseEntity.ok(improvementProposalService.findImprovementProposalsByUserId(userId));
    }

    @DeleteMapping("/{ipId}")
    public ResponseEntity<ImprovementProposal> deleteImprovementProposalById(@PathVariable UUID ipId) {
        improvementProposalService.deleteImprovementProposalById(ipId);
        return ResponseEntity.ok(null);
    }

    @GetMapping("/for-review/{reviewerId}")
    public ResponseEntity<Set<ImprovementProposal>> getImprovementProposalsForReviewer(@PathVariable UUID reviewerId) {
        return ResponseEntity.ok(improvementProposalService.getImprovementProposalsForReviewer(reviewerId));
    }
}
