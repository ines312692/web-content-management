package com.example.web_content_management_back.mapper;

import com.example.web_content_management_back.dto.UserDTO;
import com.example.web_content_management_back.model.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
    public UserDTO toDTO(User user) {
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole());
        dto.setUsername(user.getUsername());
        dto.setPassword(user.getPassword());
        if (user.getResponsibleUser() != null) {
            dto.setResponsibleUserId(user.getResponsibleUser().getId());
        }
        return dto;
    }

    public User toEntity(UserDTO dto, User responsibleUser) {
        User user = new User();
        user.setId(dto.getId());
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setRole(dto.getRole());
        user.setUsername(dto.getUsername());
        user.setPassword(dto.getPassword());
        user.setResponsibleUser(responsibleUser);
        return user;
    }
}