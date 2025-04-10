package com.example.web_content_management_back.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "pages")
@Data
public class Page {
    @Id
    private String id;
    private String name;
    @DBRef
    private Layout layout;
}