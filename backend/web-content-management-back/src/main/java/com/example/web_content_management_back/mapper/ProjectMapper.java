package com.example.web_content_management_back.mapper;

import com.example.web_content_management_back.dto.ProjectDTO;
import com.example.web_content_management_back.model.Project;
import com.example.web_content_management_back.model.Website;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ProjectMapper {
    public ProjectDTO toDTO(Project project) {
        ProjectDTO dto = new ProjectDTO();
        dto.setId(project.getId());
        dto.setName(project.getName());
        dto.setDescription(project.getDescription());
        dto.setWebsiteIds(project.getWebsites().stream().map(Website::getId).collect(Collectors.toList()));
        return dto;
    }

    public Project toEntity(ProjectDTO dto, List<Website> websites) {
        Project project = new Project();
        project.setId(dto.getId());
        project.setName(dto.getName());
        project.setDescription(dto.getDescription());
        project.setWebsites(websites);
        return project;
    }
}