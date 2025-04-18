package com.example.web_content_management_back.controller;

import com.example.web_content_management_back.dto.UserDTO;
import com.example.web_content_management_back.service.UserService;
import org.springframework.web.bind.annotation.*;
import com.example.web_content_management_back.model.Project;
import com.example.web_content_management_back.repository.ProjectRepository;


import java.util.Optional;
import java.util.stream.Collectors;

import java.util.List;


@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;
    private final ProjectRepository projectRepository;


    public UserController(UserService userService, ProjectRepository projectRepository) {
        this.userService = userService;
        this.projectRepository = projectRepository;
    }

    @GetMapping
    public List<UserDTO> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public UserDTO getUserById(@PathVariable String id) {
        return userService.getUserById(id);
    }

    @PostMapping
    public UserDTO createUser(@RequestBody UserDTO userDTO) {
        return userService.createUser(userDTO);
    }

    @PutMapping("/{id}")
    public UserDTO updateUser(@PathVariable String id, @RequestBody UserDTO userDTO) {
        return userService.updateUser(id, userDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable String id) {
        userService.deleteUser(id);
    }
    @GetMapping("/{id}/is-responsible")
    public boolean isResponsible(@PathVariable String id) {
        return userService.isResponsible(id);
    }

    @GetMapping("/responsible/{responsibleId}")
    public List<UserDTO> getUsersByResponsibleId(@PathVariable String responsibleId) {
        return userService.getUsersByResponsibleId(responsibleId);
    }

    @GetMapping("/{id}/projects")
    public List<String> getUserProjects(@PathVariable String id) {
        return userService.getUserProjects(id);
    }

    @PostMapping("/{userId}/projects/{projectId}")
    public void addProjectToUser(@PathVariable String userId, @PathVariable String projectId) {
        userService.addProjectToUser(userId, projectId);
    }

    @GetMapping("/{id}/databases")
        public List<String> getUserDatabases(@PathVariable String id) {
            return userService.getUserDatabases(id);
        }

    @PostMapping("/{userId}/databases/{databaseId}")
    public void addDatabaseToUser(@PathVariable String userId, @PathVariable String databaseId) {
            userService.addDatabaseToUser(userId, databaseId);
        }

}