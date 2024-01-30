package io.paymove.recruitment.auth;

import io.paymove.recruitment.model.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

/**
 * Class that models data sent to frontend with user data and JWT
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {
    private String token;
    private UUID userId;
    private Role role;
    private String name;
}
