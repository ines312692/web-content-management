package com.example.web_content_management_back.service.impl;

import com.example.web_content_management_back.dto.ProjectDTO;
import com.example.web_content_management_back.mapper.ProjectMapper;
import com.example.web_content_management_back.model.Project;
import com.example.web_content_management_back.model.Website;
import com.example.web_content_management_back.repository.ProjectRepository;
import com.example.web_content_management_back.repository.WebsiteRepository;
import com.example.web_content_management_back.service.ProjectService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectServiceImpl implements ProjectService {
    private final ProjectRepository projectRepository;
    private final WebsiteRepository websiteRepository;
    private final ProjectMapper projectMapper;

    public ProjectServiceImpl(ProjectRepository projectRepository, WebsiteRepository websiteRepository, ProjectMapper projectMapper) {
        this.projectRepository = projectRepository;
        this.websiteRepository = websiteRepository;
        this.projectMapper = projectMapper;
    }

    @Override
    public List<ProjectDTO> getAllProjects() {
        return projectRepository.findAll().stream()
                .map(projectMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ProjectDTO getProjectById(String id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        return projectMapper.toDTO(project);
    }

    @Override
    public ProjectDTO createProject(ProjectDTO projectDTO) {
        List<Website> websites = websiteRepository.findAllById(projectDTO.getWebsiteIds());
        Project project = projectMapper.toEntity(projectDTO, websites);
        return projectMapper.toDTO(projectRepository.save(project));
    }

    @Override
    public ProjectDTO updateProject(String id, ProjectDTO projectDTO) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        List<Website> websites = websiteRepository.findAllById(projectDTO.getWebsiteIds());
        project.setName(projectDTO.getName());
        project.setDescription(projectDTO.getDescription());
        project.setWebsites(websites);

        return projectMapper.toDTO(projectRepository.save(project));
    }

    @Override
    public void deleteProject(String id) {
        projectRepository.deleteById(id);
    }
    @Override
    public void removeWebsiteFromProject(String projectId, String websiteId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        Website website = websiteRepository.findById(websiteId)
                .orElseThrow(() -> new RuntimeException("Website not found"));

        if (project.getWebsites().contains(website)) {
            project.getWebsites().remove(website);
            projectRepository.save(project);
        }
    }
    @Override
    public void addWebsiteToProject(String projectId, String websiteId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        Website website = websiteRepository.findById(websiteId)
                .orElseThrow(() -> new RuntimeException("Website not found"));

        if (!project.getWebsites().contains(website)) {
            project.getWebsites().add(website);
            projectRepository.save(project);
        }
    }

}