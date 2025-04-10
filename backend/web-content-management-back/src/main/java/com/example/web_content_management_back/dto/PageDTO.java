package com.example.web_content_management_back.dto;

import lombok.Data;

@Data
public class PageDTO {
    private String id;
    private String name;
    private LayoutDTO layout;
}