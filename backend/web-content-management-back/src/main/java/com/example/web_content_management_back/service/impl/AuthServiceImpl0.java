// src/main/java/com/example/web_content_management_back/service/impl/AuthServiceImpl.java
/*package com.example.web_content_management_back.service.impl;

import com.example.web_content_management_back.dto.LoginRequest;
import com.example.web_content_management_back.dto.UserDTO;
import com.example.web_content_management_back.model.User;
import com.example.web_content_management_back.repository.UserRepository;
import com.example.web_content_management_back.service.AuthService;
import com.example.web_content_management_back.util.JwtTokenUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthServiceImpl0 implements AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenUtil jwtTokenUtil;

    public AuthServiceImpl0(UserRepository userRepository, 
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

            System.out.println("Found user: " + user.getEmail()); // Logging

            //if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword()))
            if (!loginRequest.getPassword().equals(user.getPassword())) {
                System.out.println("Password mismatch"); // Logging
                throw new RuntimeException("Invalid password");
            }

            // 3. Generate token using JwtTokenUtil
            String token = jwtTokenUtil.generateToken(user);
            System.out.println("Token generated"); // Logging
            UserDTO userDTO = convertToDTO(user);
            System.out.println("converted to dto"); // Logging

            // 4. Return response
            Map<String, Object> response = new HashMap<>();
            response.put("user", userDTO);
            response.put("token", token);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.out.println("Login error: " + e.getMessage()); // Logging
            throw new RuntimeException("Login failed: " + e.getMessage());
        }
    }

    @Override
    public ResponseEntity<?> loginWithGoogle() {
        // Implement Google OAuth2 login logic
        // This would typically involve redirecting to Google's auth endpoint
        // and handling the callback
        throw new UnsupportedOperationException("Google login not implemented yet");
    }

    private UserDTO convertToDTO(User user) {
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole());
        dto.setUsername(user.getUsername());
        // Don't include password in DTO
        return dto;
    }
}*/