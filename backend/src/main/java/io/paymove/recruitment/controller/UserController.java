package io.paymove.recruitment.controller;

import io.paymove.recruitment.model.Role;
import io.paymove.recruitment.model.User;
import io.paymove.recruitment.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

/**
 * The controller for REST endpoints related to User entity.
 */
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    /**
     * Returns all users in database
     * @return ResponseEntity with list of User objects
     */
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.status(HttpStatus.OK).body(userService.getAllUsers());
    }

    /**
     * Updates role of a user with given ID to specified role
     * @param id UUID of user to update
     * @param role enum describing new role
     * @return ResponseEntity with appropriate message
     */
    @PatchMapping("change-role/{id}/{role}")
    public ResponseEntity<?> changeRole(@PathVariable UUID id, @PathVariable Role role) {
        boolean updatePerformed = userService.changeRole(id, role);
        if (updatePerformed) {
            return ResponseEntity.status(HttpStatus.OK).body("Role changed");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No user with requested id");
    }
}
