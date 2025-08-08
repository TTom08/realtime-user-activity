package com.example.auth_service.service;

import com.example.auth_service.dto.LoginRequestDto;
import com.example.auth_service.dto.RegisterRequestDto;
import com.example.auth_service.model.User;
import com.example.auth_service.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;

public class AuthService {
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private AuthenticationManager authenticationManager;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User registerUser(RegisterRequestDto registerRequestDto) {
        // Check if the user already exists
        if (userRepository.findByUsername(registerRequestDto.username()).isPresent()) {
            throw new IllegalArgumentException("User already exists with username: " + registerRequestDto.username());
        }

        // Create a new User object
        User user = new User();
        user.setName(registerRequestDto.name());
        user.setUsername(registerRequestDto.username());
        // Encode the password before saving
        user.setPassword(passwordEncoder.encode(registerRequestDto.password()));

        // Save the user to the repository
        return userRepository.save(user);
    }

    public User loginUser(LoginRequestDto loginRequestDto) {
        return userRepository.findByUsername(loginRequestDto.username())
                .filter(user -> passwordEncoder.matches(loginRequestDto.password(), user.getPassword()))
                .orElseThrow(() -> new IllegalArgumentException("Invalid username or password"));
    }
}
