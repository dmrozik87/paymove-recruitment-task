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

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.status(HttpStatus.OK).body(userService.getAllUsers());
    }

    @PatchMapping("change-role/{id}/{role}")
    public ResponseEntity<?> changeRole(@PathVariable UUID id, @PathVariable Role role) {
        boolean updatePerformed = userService.changeRole(id, role);
        if (updatePerformed) {
            return ResponseEntity.status(HttpStatus.OK).body("Role changed");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No user with requested id");
    }
}
