package io.paymove.recruitment.service;

import io.paymove.recruitment.model.Role;
import io.paymove.recruitment.model.User;
import io.paymove.recruitment.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Service class for encapsulating logic related to manipulating users
 */
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    /**
     * Gets all users
     * @return list of User objects
     */
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    /**
     * Updates role of a user with given ID to specified role if user exists
     * @param id UUID of user to update
     * @param role enum describing new role
     * @return boolean indicating whether the change was successful
     */
    public boolean changeRole(UUID id, Role role) {
        Optional<User> optionalUser = userRepository.findById(id);

        if (optionalUser.isEmpty()) return false;

        User userToUpdate = optionalUser.get();

        userToUpdate.setRole(role);

        userRepository.save(userToUpdate);

        return true;
    }
}
