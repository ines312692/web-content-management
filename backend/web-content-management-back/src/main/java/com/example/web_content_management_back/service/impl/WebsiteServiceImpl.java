package com.example.web_content_management_back.service.impl;

import com.example.web_content_management_back.dto.LayoutDTO;
import com.example.web_content_management_back.dto.PageDTO;
import com.example.web_content_management_back.dto.WebsiteDTO;
import com.example.web_content_management_back.mapper.WebsiteMapper;
import com.example.web_content_management_back.model.Layout;
import com.example.web_content_management_back.model.Page;
import com.example.web_content_management_back.model.Website;
import com.example.web_content_management_back.repository.PageRepository;
import com.example.web_content_management_back.repository.WebsiteRepository;
import com.example.web_content_management_back.service.WebsiteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.web_content_management_back.dto.NodeDTO;
import com.example.web_content_management_back.model.Node;

import java.util.Collections;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class WebsiteServiceImpl implements WebsiteService {

    @Autowired
    private WebsiteRepository websiteRepository;

    @Autowired
    private PageRepository pageRepository;

    @Autowired
    private WebsiteMapper websiteMapper;

    @Override
    public List<WebsiteDTO> getAllWebsites() {
        return websiteRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public WebsiteDTO createWebsite(WebsiteDTO websiteDTO) {
        Website website = convertToEntity(websiteDTO);
        website.setId(UUID.randomUUID().toString());
        List<Page> pages = websiteDTO.getPages() != null ? websiteDTO.getPages().stream()
                .map(pageDTO -> pageRepository.findById(pageDTO.getId())
                        .orElseThrow(() -> new RuntimeException("Page not found")))
                .collect(Collectors.toList()) : Collections.emptyList();
        website.setPages(pages);

        Website savedWebsite = websiteRepository.save(website);
        return convertToDTO(savedWebsite);
    }

    @Override
    public WebsiteDTO getWebsiteById(String id) {
        Website website = websiteRepository.findById(id).orElseThrow(() -> new RuntimeException("Website not found"));
        return convertToDTO(website);
    }

    @Override
    public WebsiteDTO updateWebsite(String id, WebsiteDTO websiteDTO) {
        Website website = convertToEntity(websiteDTO);
        website.setId(id);
        List<Page> pages = websiteDTO.getPages() != null ? websiteDTO.getPages().stream()
                .map(pageDTO -> pageRepository.findById(pageDTO.getId())
                        .orElseThrow(() -> new RuntimeException("Page not found")))
                .collect(Collectors.toList()) : Collections.emptyList();
        website.setPages(pages);

        Website updatedWebsite = websiteRepository.save(website);
        return convertToDTO(updatedWebsite);
    }

    @Override
    public void deleteWebsite(String id) {
        websiteRepository.deleteById(id);
    }

    private WebsiteDTO convertToDTO(Website website) {
        WebsiteDTO websiteDTO = new WebsiteDTO();
        websiteDTO.setId(website.getId());
        websiteDTO.setName(website.getName());
        websiteDTO.setDomain(website.getDomain());
        websiteDTO.setType(website.getType());
        websiteDTO.setPrimaryColor(website.getPrimaryColor());
        websiteDTO.setDescription(website.getDescription());
        websiteDTO.setPages(website.getPages() != null ? website.getPages().stream()
                .map(page -> {
                    PageDTO pageDTO = new PageDTO();
                    pageDTO.setId(page.getId());
                    pageDTO.setName(page.getName());
                    pageDTO.setLayout(convertToLayoutDTO(page.getLayout()));
                    return pageDTO;
                })
                .collect(Collectors.toList()) : Collections.emptyList());
        return websiteDTO;
    }

    private Website convertToEntity(WebsiteDTO websiteDTO) {
        Website website = new Website();
        website.setId(websiteDTO.getId());
        website.setName(websiteDTO.getName());
        website.setDomain(websiteDTO.getDomain());
        website.setType(websiteDTO.getType());
        website.setPrimaryColor(websiteDTO.getPrimaryColor());
        website.setDescription(websiteDTO.getDescription());
        website.setPages(websiteDTO.getPages() != null ? websiteDTO.getPages().stream()
                .map(pageDTO -> {
                    Page page = new Page();
                    page.setId(pageDTO.getId());
                    page.setName(pageDTO.getName());
                    page.setLayout(convertToLayout(pageDTO.getLayout()));
                    return page;
                })
                .collect(Collectors.toList()) : Collections.emptyList());
        return website;
    }

    private LayoutDTO convertToLayoutDTO(Layout layout) {
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
        layoutDTO.setNodes(layout.getNodes() != null ? layout.getNodes().stream()
                .map(node -> {
                    NodeDTO nodeDTO = new NodeDTO();
                    nodeDTO.setId(node.getId());
                    return nodeDTO;
                })
                .collect(Collectors.toList()) : Collections.emptyList());
        return layoutDTO;
    }

    private Layout convertToLayout(LayoutDTO layoutDTO) {
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
        layout.setNodes(layoutDTO.getNodes() != null ? layoutDTO.getNodes().stream()
                .map(nodeDTO -> {
                    Node node = new Node();
                    node.setId(nodeDTO.getId());
                    return node;
                })
                .collect(Collectors.toList()) : Collections.emptyList());
        return layout;
    }
}