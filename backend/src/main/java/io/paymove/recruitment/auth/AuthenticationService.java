package io.paymove.recruitment.auth;

import io.paymove.recruitment.config.JwtService;
import io.paymove.recruitment.model.Role;
import io.paymove.recruitment.model.User;
import io.paymove.recruitment.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

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
                .userID(user.getUsedId())
                .build();
    }
}
