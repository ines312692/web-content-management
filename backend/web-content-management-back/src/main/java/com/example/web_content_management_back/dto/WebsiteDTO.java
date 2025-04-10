package com.example.web_content_management_back.dto;

import lombok.Data;
import java.util.List;

@Data
public class WebsiteDTO {
    private String id;
    private String name;
    private String domain;
    private String type;
    private String primaryColor;
    private String description;
    private List<PageDTO> pages;
}