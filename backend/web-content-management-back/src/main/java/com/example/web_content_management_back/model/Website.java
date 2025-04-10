package com.example.web_content_management_back.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.ArrayList;

@Document(collection = "websites")
@Data
public class Website {
    @Id
    private String id;
    private String name;
    private String domain;
    private String type;
    private String primaryColor;
    private String description;

    @DBRef
    private List<Page> pages=new ArrayList<>();;
}