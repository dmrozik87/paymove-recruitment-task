package io.paymove.recruitment.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * The controller for REST endpoints related to authentication.
 */
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    /**
     * <p>Create new user, given the data provided</p>
     * <p>Returns one of the following status codes:</p>
     * <p>200: successfully created a new user</p>
     * <p>400: unable to create new user, because user with given name or email already exists</p>
     * @param request Object with data necessary to create new user
     * @return Object with data necessary for frontend
     */
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
        AuthenticationResponse authenticationResponse = authenticationService.register(request);
        if (authenticationResponse == null) {
            return ResponseEntity.status(HttpStatusCode.valueOf(400)).body(null);
        }
        return ResponseEntity.ok(authenticationResponse);
    }

    /**
     * <p>Authenticates user, given the data provided</p>
     * @param request Object with data necessary to authenticate user
     * @return Object with data necessary for frontend
     */
    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }
}
