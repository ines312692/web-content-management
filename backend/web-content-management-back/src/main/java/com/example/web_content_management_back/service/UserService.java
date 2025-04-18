package com.example.web_content_management_back.service;

import com.example.web_content_management_back.dto.UserDTO;

import java.util.List;

public interface UserService {
    List<UserDTO> getAllUsers();
    UserDTO getUserById(String id);
    UserDTO createUser(UserDTO userDTO);
    UserDTO updateUser(String id, UserDTO userDTO);
    void deleteUser(String id);
    boolean isResponsible(String userId);
    List<UserDTO> getUsersByResponsibleId(String responsibleId);
    List<String> getUserProjects(String userId);
    void addProjectToUser(String userId, String projectId);
    List<String> getUserDatabases(String userId);;
    void addDatabaseToUser(String userId, String databaseId);
}