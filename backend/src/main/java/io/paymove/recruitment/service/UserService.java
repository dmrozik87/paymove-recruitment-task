package io.paymove.recruitment.service;

import io.paymove.recruitment.model.Role;
import io.paymove.recruitment.model.User;
import io.paymove.recruitment.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public boolean changeRole(UUID id, Role role) {
        Optional<User> optionalUser = userRepository.findById(id);

        if (optionalUser.isEmpty()) return false;

        User userToUpdate = optionalUser.get();

        userToUpdate.setRole(role);

        userRepository.save(userToUpdate);

        return true;
    }
}
