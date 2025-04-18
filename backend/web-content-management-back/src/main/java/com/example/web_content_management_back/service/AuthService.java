package com.example.web_content_management_back.service;

import org.springframework.http.ResponseEntity;

import com.example.web_content_management_back.dto.LoginRequest;
import com.example.web_content_management_back.dto.RegisterUserDTO;

public interface AuthService {
    ResponseEntity<?> login(LoginRequest loginRequest);
    ResponseEntity<?> register(RegisterUserDTO registrationDto);
    ResponseEntity<?> loginWithGoogle();
}