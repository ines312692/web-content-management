package com.example.web_content_management_back.controller;

import com.example.web_content_management_back.dto.LoginRequest;
import com.example.web_content_management_back.dto.RegisterUserDTO;
import com.example.web_content_management_back.dto.UserDTO;
import com.example.web_content_management_back.service.AuthService;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:8081"})
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
    try {
        return authService.login(loginRequest);
    } catch (RuntimeException e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("message", e.getMessage()));
    }
}

@PostMapping("/register")
public ResponseEntity<?> registerUser(@RequestBody RegisterUserDTO registrationDto) {
    return authService.register(registrationDto);
}

    @GetMapping("/google")
    public ResponseEntity<?> googleLogin() {
        return authService.loginWithGoogle();
    }
}