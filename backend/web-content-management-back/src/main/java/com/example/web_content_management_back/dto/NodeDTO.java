package com.example.web_content_management_back.dto;

import lombok.Data;
import java.util.List;

@Data
public class NodeDTO {
    private String id;
    private String name;
    private String type;
    private boolean selected;
    private String description;
    private String widgetId;
    private String width;
    private String height;
    private String backgroundColor;
    private String borderColor;
    private List<NodeDTO> children;
    private NodeDTO parent;
    private boolean template;

    public NodeDTO getParent() {
        return parent;
    }

    public void setParent(NodeDTO parent) {
        this.parent = parent;
    }
}