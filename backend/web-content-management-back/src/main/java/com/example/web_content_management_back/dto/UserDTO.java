package com.example.web_content_management_back.dto;

import lombok.Data;
import java.util.List;

@Data
public class UserDTO {
    private String id;
    private String name;
    private String email;
    private String role;
    private String username;
    private String password;
    private String responsibleUserId;
    private List<String> projectIds;
    private List<String> databaseIds;
}