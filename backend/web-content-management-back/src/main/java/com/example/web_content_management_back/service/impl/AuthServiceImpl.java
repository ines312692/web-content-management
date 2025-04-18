package com.example.web_content_management_back.service.impl;

import com.example.web_content_management_back.dto.LoginRequest;
import com.example.web_content_management_back.dto.RegisterUserDTO;
import com.example.web_content_management_back.dto.UserDTO;
import com.example.web_content_management_back.model.User;
import com.example.web_content_management_back.repository.UserRepository;
import com.example.web_content_management_back.service.AuthService;
import com.example.web_content_management_back.util.JwtTokenUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenUtil jwtTokenUtil;

    public AuthServiceImpl(UserRepository userRepository,
                         PasswordEncoder passwordEncoder,
                         JwtTokenUtil jwtTokenUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @Override
    public ResponseEntity<?> login(LoginRequest loginRequest) {
        try {
            User user = userRepository.findByEmail(loginRequest.getEmail())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                throw new RuntimeException("Invalid credentials");
            }
            UserDetails userDetails = org.springframework.security.core.userdetails.User
            .withUsername(user.getEmail())
            .password("")
            .roles(user.getRole())
            .build();
            String token = jwtTokenUtil.generateToken(userDetails);

            Map<String, Object> response = new HashMap<>();
            response.put("user", convertToDTO(user));
            response.put("token", token);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of(
                "message", e.getMessage(),
                "status", 401
            ));
        }
    }

    @Override
    public ResponseEntity<?> register(RegisterUserDTO registrationDto) {
        try {
            if (userRepository.findByEmail(registrationDto.getEmail()).isPresent()) {
                return ResponseEntity.badRequest().body("Email already in use");
            }

            User user = new User();
            user.setName(registrationDto.getName());
            user.setEmail(registrationDto.getEmail());
            user.setRole(registrationDto.getRole());
            user.setPassword(passwordEncoder.encode(registrationDto.getPassword()));

            // Assigner l'utilisateur responsable
            if (registrationDto.getResponsibleId() != null && !registrationDto.getResponsibleId().isEmpty()) {
                User responsibleUser = userRepository.findById(registrationDto.getResponsibleId())
                        .orElseThrow(() -> new RuntimeException("Responsable user not found"));
                user.setResponsibleUser(responsibleUser);
            }

            User savedUser = userRepository.save(user);

            UserDetails userDetails = org.springframework.security.core.userdetails.User
                    .withUsername(savedUser.getEmail())
                    .password(savedUser.getPassword())
                    .roles(savedUser.getRole())
                    .build();

            String token = jwtTokenUtil.generateToken(userDetails);

            Map<String, Object> response = new HashMap<>();
            response.put("user", convertToDTO(savedUser));
            response.put("token", token);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                "message", "Registration failed: " + e.getMessage(),
                "status", 500
            ));
        }
    }
    @Override
    public ResponseEntity<?> loginWithGoogle() {
        throw new UnsupportedOperationException("Google login not implemented yet");
    }

    private UserDTO convertToDTO(User user) {
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole());
        dto.setUsername(user.getUsername());
        return dto;
    }
}