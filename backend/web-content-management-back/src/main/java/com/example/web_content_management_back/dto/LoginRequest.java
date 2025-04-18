package com.example.web_content_management_back.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;
}