package com.example.web_content_management_back.service;

import com.example.web_content_management_back.dto.LayoutDTO;

import java.util.List;

public interface LayoutService {
    List<LayoutDTO> getAllLayouts();
    LayoutDTO createLayout(LayoutDTO layoutDTO);
    LayoutDTO getLayoutById(String id);
    LayoutDTO updateLayout(String id, LayoutDTO layoutDTO);
    void deleteLayout(String id);
}