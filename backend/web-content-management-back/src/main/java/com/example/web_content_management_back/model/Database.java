package com.example.web_content_management_back.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "databases")
@Data
public class Database {
    @Id
    private String id;
    private String name;
    private String type;
    private String connectionString;
    private String description;
    private String username;
    private String password;
}