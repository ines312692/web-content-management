package com.example.web_content_management_back.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.util.List;
import java.util.ArrayList;

@Document(collection = "users")
@Data
public class User {
    @Id
    private String id;
    private String name;
    private String email;
    private String role;
    private String username;
    private String password;

    @DBRef
    private User responsibleUser;

    @DBRef
    private List<Project> projects = new ArrayList<>();
    @DBRef
    private List<Database> databases = new ArrayList<>();
}