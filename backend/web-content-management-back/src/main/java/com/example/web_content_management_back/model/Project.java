package com.example.web_content_management_back.model;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.ArrayList;
import java.util.List;


@Document(collection = "projects")
@Data
public class Project {
    @Id
    private String id;
    private String name;
    private String description;

    @DBRef
    private List<Website> websites = new ArrayList<>();
}