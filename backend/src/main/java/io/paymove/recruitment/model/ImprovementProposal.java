package io.paymove.recruitment.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.*;

import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class ImprovementProposal {
    @Id
    private UUID ipId = UUID.randomUUID();
    private String status;
    private String title;
    private String department;
    private String description;
    @ManyToOne(optional = false)
    private User user;
    @ManyToOne
    private User reviewer;
}
