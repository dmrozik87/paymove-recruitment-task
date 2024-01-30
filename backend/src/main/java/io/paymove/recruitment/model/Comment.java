package io.paymove.recruitment.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Class modeling Comment entity
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class Comment {
    @Id
    private UUID commentId = UUID.randomUUID();
    @ManyToOne
    private ImprovementProposal improvementProposal;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User createdBy;
    private LocalDateTime createdAt;
    @Column(columnDefinition = "TEXT")
    private String text;
}
