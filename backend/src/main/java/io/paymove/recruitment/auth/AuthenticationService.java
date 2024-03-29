package io.paymove.recruitment.auth;

import io.paymove.recruitment.config.JwtService;
import io.paymove.recruitment.model.Role;
import io.paymove.recruitment.model.User;
import io.paymove.recruitment.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * Service class for encapsulating logic related to user creation and user authentication.
 */
@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    /**
     * Method creates new user if user with given name or email doesn't exist
     * @param request Object with data necessary to create new user
     * @return Object with data necessary for frontend
     */
    public AuthenticationResponse register(RegisterRequest request) {

        boolean userExists = userRepository.existsByUserNameOrUserEmail(request.getUsername(), request.getEmail());

        if (userExists) return null;

        User user = new User();
        user.setUserName(request.getUsername());
        user.setUserEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.SUBMITTER);
        userRepository.save(user);

        String jwt = jwtService.generateToken(user);

        return AuthenticationResponse.builder()
                .token(jwt)
                .userId(user.getUserId())
                .role(user.getRole())
                .name(user.getUsername())
                .build();
    }

    /**
     * Validates credentials to authenticate user
     * @param request Object with data necessary to authenticate user
     * @return Object with data necessary for frontend
     */
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );

        User user = userRepository.findByUserName(request.getUsername()).orElseThrow();

        String jwt = jwtService.generateToken(user);

        return AuthenticationResponse.builder()
                .token(jwt)
                .userId(user.getUserId())
                .role(user.getRole())
                .name(user.getUsername())
                .build();
    }
}
