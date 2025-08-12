package com.example.auth_service.controller;

import com.example.auth_service.dto.KafkaProducerDto;
import com.example.auth_service.dto.LoginRequestDto;
import com.example.auth_service.dto.RegisterRequestDto;
import com.example.auth_service.kafka.KafkaProducerService;
import com.example.auth_service.model.Role;
import com.example.auth_service.model.User;
import com.example.auth_service.repository.RoleRepository;
import com.example.auth_service.repository.UserRepository;
import com.example.auth_service.security.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final KafkaProducerService kafkaProducerService;

    public AuthController(AuthenticationManager authenticationManager, JwtUtil jwtUtil, UserRepository userRepository,RoleRepository roleRepository, PasswordEncoder passwordEncoder, KafkaProducerService kafkaProducerService) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.kafkaProducerService = kafkaProducerService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody RegisterRequestDto registerRequestDto) {
        if(userRepository.findByUsername(registerRequestDto.username()).isPresent()) {
            return ResponseEntity.badRequest().body("Username is already taken");
        }

        User newUser = new User();
        newUser.setUsername(registerRequestDto.username());
        newUser.setName(registerRequestDto.name());

        Set<Role> roles = new HashSet<>();

        Role userRole = roleRepository.findByName("USER")
                .orElseGet(() -> {
                    Role newRole = new Role("USER");
                    return roleRepository.save(newRole);
                });

        roles.add(userRole);
        newUser.setRoles(roles);

        String encodedPassword = passwordEncoder.encode(registerRequestDto.password());
        newUser.setPassword(encodedPassword);

        userRepository.save(newUser);

        KafkaProducerDto event = new KafkaProducerDto(
                newUser.getId(),
                "USER_REGISTERED",
                LocalDateTime.now()
        );
        kafkaProducerService.sendMessage(event);
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody LoginRequestDto loginRequestDto) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequestDto.username(), loginRequestDto.password()));
        } catch (Exception e) {
            System.out.println("Exception: " + e);
        }
        String token = jwtUtil.generateToken(loginRequestDto.username());
        User user = userRepository.findByUsername(loginRequestDto.username())
                .orElseThrow(() -> new RuntimeException("User not found"));

        KafkaProducerDto event = new KafkaProducerDto(
                user.getId(),
                "USER_LOGIN",
                LocalDateTime.now()
        );
        kafkaProducerService.sendMessage(event);
        return ResponseEntity.ok(token);
    }
}
