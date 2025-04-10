package com.example.web_content_management_back.controller;

import com.example.web_content_management_back.dto.WebsiteDTO;
import com.example.web_content_management_back.service.WebsiteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/websites")
public class WebsiteController {

    @Autowired
    private WebsiteService websiteService;

    @GetMapping
    public List<WebsiteDTO> getAllWebsites() {
        return websiteService.getAllWebsites();
    }

    @PostMapping
    public WebsiteDTO createWebsite(@RequestBody WebsiteDTO websiteDTO) {
        return websiteService.createWebsite(websiteDTO);
    }

    @GetMapping("/{id}")
    public WebsiteDTO getWebsiteById(@PathVariable String id) {
        return websiteService.getWebsiteById(id);
    }

    @PutMapping("/{id}")
    public WebsiteDTO updateWebsite(@PathVariable String id, @RequestBody WebsiteDTO websiteDTO) {
        return websiteService.updateWebsite(id, websiteDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteWebsite(@PathVariable String id) {
        websiteService.deleteWebsite(id);
    }
}