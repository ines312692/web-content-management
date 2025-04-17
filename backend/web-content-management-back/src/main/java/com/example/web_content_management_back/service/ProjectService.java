package com.example.web_content_management_back.service;

import com.example.web_content_management_back.dto.ProjectDTO;

import java.util.List;

public interface ProjectService {
    List<ProjectDTO> getAllProjects();
    ProjectDTO getProjectById(String id);
    ProjectDTO createProject(ProjectDTO projectDTO);
    ProjectDTO updateProject(String id, ProjectDTO projectDTO);
    void deleteProject(String id);
    void removeWebsiteFromProject(String projectId, String websiteId);
    void addWebsiteToProject(String projectId, String websiteId);
}