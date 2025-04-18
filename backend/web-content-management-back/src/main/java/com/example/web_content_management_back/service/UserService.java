package com.example.web_content_management_back.service;

import com.example.web_content_management_back.dto.UserDTO;
import java.util.List;

public interface UserService {
    List<UserDTO> getAllUsers();
    UserDTO getUserById(String id);
    UserDTO createUser(UserDTO dto);
    UserDTO updateUser(String id, UserDTO dto);
    void deleteUser(String id);
}