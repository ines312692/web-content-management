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
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public UserServiceImpl(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    @Override
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(userMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public UserDTO getUserById(String id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return userMapper.toDTO(user);
    }

    @Override
    public UserDTO createUser(UserDTO userDTO) {
        User responsibleUser = null;
        if (userDTO.getResponsibleUserId() != null) {
            responsibleUser = userRepository.findById(userDTO.getResponsibleUserId())
                    .orElseThrow(() -> new RuntimeException("Responsible user not found"));
        }
        User user = userMapper.toEntity(userDTO, responsibleUser);
        return userMapper.toDTO(userRepository.save(user));
    }

    @Override
    public UserDTO updateUser(String id, UserDTO userDTO) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        User responsibleUser = null;
        if (userDTO.getResponsibleUserId() != null) {
            responsibleUser = userRepository.findById(userDTO.getResponsibleUserId())
                    .orElseThrow(() -> new RuntimeException("Responsible user not found"));
        }

        user.setName(userDTO.getName());
        user.setEmail(userDTO.getEmail());
        user.setRole(userDTO.getRole());
        user.setUsername(userDTO.getUsername());
        user.setResponsibleUser(responsibleUser);

        return userMapper.toDTO(userRepository.save(user));
    }

    @Override
    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }
   @Override
   public boolean isResponsible(String userId) {
       return userRepository.findAll().stream()
               .anyMatch(user -> user.getResponsibleUser() != null && user.getResponsibleUser().getId().equals(userId));
   }

   @Override
   public List<UserDTO> getUsersByResponsibleId(String responsibleId) {
       return userRepository.findAll().stream()
               .filter(user -> user.getResponsibleUser() != null && user.getResponsibleUser().getId().equals(responsibleId))
               .map(userMapper::toDTO)
               .collect(Collectors.toList());
   }
}