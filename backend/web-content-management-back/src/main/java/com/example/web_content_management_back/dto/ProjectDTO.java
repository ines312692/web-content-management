package com.example.web_content_management_back.dto;

import lombok.Data;

import java.util.List;

@Data
public class ProjectDTO {
    private String id;
    private String name;
    private String description;
    private List<String> websiteIds; // IDs des websites associés
}