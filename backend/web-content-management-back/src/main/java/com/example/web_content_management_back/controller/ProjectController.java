package com.example.web_content_management_back.controller;

import com.example.web_content_management_back.dto.ProjectDTO;
import com.example.web_content_management_back.service.ProjectService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/projects")
public class ProjectController {
    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping
    public List<ProjectDTO> getAllProjects() {
        return projectService.getAllProjects();
    }

    @GetMapping("/{id}")
    public ProjectDTO getProjectById(@PathVariable String id) {
        return projectService.getProjectById(id);
    }

    @PostMapping
    public ProjectDTO createProject(@RequestBody ProjectDTO projectDTO) {
        return projectService.createProject(projectDTO);
    }

    @PutMapping("/{id}")
    public ProjectDTO updateProject(@PathVariable String id, @RequestBody ProjectDTO projectDTO) {
        return projectService.updateProject(id, projectDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteProject(@PathVariable String id) {
        projectService.deleteProject(id);
    }

    @PatchMapping("/{projectId}/remove-website/{websiteId}")
    public void removeWebsiteFromProject(@PathVariable String projectId, @PathVariable String websiteId) {
        projectService.removeWebsiteFromProject(projectId, websiteId);
    }


    @PatchMapping("/{projectId}/add-website/{websiteId}")
    public void addWebsiteToProject(@PathVariable String projectId, @PathVariable String websiteId) {
        projectService.addWebsiteToProject(projectId, websiteId);
    }
}