package com.example.web_content_management_back.service.impl;

import com.example.web_content_management_back.dto.UserDTO;
import com.example.web_content_management_back.mapper.UserMapper;
import com.example.web_content_management_back.model.User;
import com.example.web_content_management_back.repository.UserRepository;
import com.example.web_content_management_back.service.UserService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository repository;
    private final UserMapper mapper;

    public UserServiceImpl(UserRepository repository, UserMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    @Override
    public List<UserDTO> getAllUsers() {
        return repository.findAll().stream()
                .map(mapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public UserDTO getUserById(String id) {
        return repository.findById(id)
                .map(mapper::toDTO)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public UserDTO createUser(UserDTO dto) {
        validateUserDTO(dto);
        User user = mapper.toEntity(dto);
        return mapper.toDTO(repository.save(user));
    }

    @Override
    public UserDTO updateUser(String id, UserDTO dto) {
        User user = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setRole(dto.getRole());
        user.setUsername(dto.getUsername());
        user.setPassword(dto.getPassword());
        
        // Handle responsable reference
        if (dto.getResponsableId() != null) {
            User responsable = repository.findById(dto.getResponsableId())
                    .orElseThrow(() -> new RuntimeException("Responsable user not found"));
            user.setResponsable(responsable);
        } else {
            user.setResponsable(null);
        }
        
        return mapper.toDTO(repository.save(user));
    }

    @Override
    public void deleteUser(String id) {
        repository.deleteById(id);
    }

    private void validateUserDTO(UserDTO dto) {
        if (dto.getUsername() == null || dto.getUsername().isEmpty()) {
            throw new IllegalArgumentException("Username is required");
        }
        if (dto.getPassword() == null || dto.getPassword().isEmpty()) {
            throw new IllegalArgumentException("Password is required");
        }
    }
}