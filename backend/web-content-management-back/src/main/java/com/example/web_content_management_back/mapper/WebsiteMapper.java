package com.example.web_content_management_back.mapper;

import com.example.web_content_management_back.dto.WebsiteDTO;
import com.example.web_content_management_back.model.Website;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class WebsiteMapper {

    public WebsiteDTO toDTO(Website website) {
        WebsiteDTO websiteDTO = new WebsiteDTO();
        websiteDTO.setId(website.getId());
        websiteDTO.setName(website.getName());
        websiteDTO.setDomain(website.getDomain());
        websiteDTO.setType(website.getType());
        websiteDTO.setPrimaryColor(website.getPrimaryColor());
        websiteDTO.setDescription(website.getDescription());
        websiteDTO.setPages(website.getPages().stream().map(new PageMapper()::toDTO).collect(Collectors.toList()));
        return websiteDTO;
    }

    public Website toEntity(WebsiteDTO websiteDTO) {
        Website website = new Website();
        website.setId(websiteDTO.getId());
        website.setName(websiteDTO.getName());
        website.setDomain(websiteDTO.getDomain());
        website.setType(websiteDTO.getType());
        website.setPrimaryColor(websiteDTO.getPrimaryColor());
        website.setDescription(websiteDTO.getDescription());
        website.setPages(websiteDTO.getPages().stream().map(new PageMapper()::toEntity).collect(Collectors.toList()));
        return website;
    }
}