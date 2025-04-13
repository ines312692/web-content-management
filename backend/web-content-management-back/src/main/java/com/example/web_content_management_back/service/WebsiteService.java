package com.example.web_content_management_back.service;

import com.example.web_content_management_back.dto.PageDTO;
import com.example.web_content_management_back.dto.WebsiteDTO;

import java.util.List;

public interface WebsiteService {
    List<WebsiteDTO> getAllWebsites();
    WebsiteDTO createWebsite(WebsiteDTO websiteDTO);
    WebsiteDTO getWebsiteById(String id);
    WebsiteDTO updateWebsite(String id, WebsiteDTO websiteDTO);
    void deleteWebsite(String id);
    List<PageDTO> getPagesByWebsiteId(String websiteId);
    PageDTO addPageToWebsite(String websiteId, PageDTO pageDTO);
    String deletePageFromWebsite(String websiteId, String pageId);
}