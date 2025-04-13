package com.example.web_content_management_back.mapper;

import com.example.web_content_management_back.dto.LayoutDTO;
import com.example.web_content_management_back.model.Layout;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;
import java.util.Collections;

@Component
public class LayoutMapper {

    public LayoutDTO toDTO(Layout layout) {
    if (layout == null) {
            return null;
        }
        LayoutDTO layoutDTO = new LayoutDTO();
        layoutDTO.setId(layout.getId());
        layoutDTO.setBorderColor(layout.getBorderColor());
        layoutDTO.setBackgroundColor(layout.getBackgroundColor());
        layoutDTO.setHeight(layout.getHeight());
        layoutDTO.setWidth(layout.getWidth());
        layoutDTO.setName(layout.getName());
        layoutDTO.setCode(layout.getCode());
        layoutDTO.setDescription(layout.getDescription());
        layoutDTO.setType(layout.getType());
        layoutDTO.setStatus(layout.getStatus());
        layoutDTO.setNodes(layout.getNodes().stream().map(new NodeMapper()::toDTO).collect(Collectors.toList()));
        return layoutDTO;
    }

    public Layout toEntity(LayoutDTO layoutDTO) {

        if (layoutDTO == null) {
            return null;
        }
        Layout layout = new Layout();
        layout.setId(layoutDTO.getId());
        layout.setBorderColor(layoutDTO.getBorderColor());
        layout.setBackgroundColor(layoutDTO.getBackgroundColor());
        layout.setHeight(layoutDTO.getHeight());
        layout.setWidth(layoutDTO.getWidth());
        layout.setName(layoutDTO.getName());
        layout.setCode(layoutDTO.getCode());
        layout.setDescription(layoutDTO.getDescription());
        layout.setType(layoutDTO.getType());
        layout.setStatus(layoutDTO.getStatus());
        layout.setNodes(layoutDTO.getNodes() != null ? layoutDTO.getNodes().stream().map(new NodeMapper()::toEntity).collect(Collectors.toList()) : Collections.emptyList());
        return layout;
    }
}