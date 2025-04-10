package com.example.web_content_management_back.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.util.List;

@Document(collection = "layouts")
@Data
public class Layout {
    @Id
    private String id;
    private String borderColor;
    private String backgroundColor;
    private String height;
    private String width;
    private String name;
    private String code;
    private String description;
    private String type;
    private String status;

    @DBRef
    private List<Node> nodes;
}