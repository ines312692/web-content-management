package com.example.web_content_management_back.dto;

import lombok.Data;
import java.util.List;

@Data
public class LayoutDTO {
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
    private List<NodeDTO> nodes;
}