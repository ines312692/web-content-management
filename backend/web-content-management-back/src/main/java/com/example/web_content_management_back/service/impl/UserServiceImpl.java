package com.example.web_content_management_back.service.impl;

import com.example.web_content_management_back.dto.UserDTO;
import com.example.web_content_management_back.mapper.UserMapper;
import com.example.web_content_management_back.model.User;
import com.example.web_content_management_back.repository.UserRepository;
import com.example.web_content_management_back.service.UserService;
import org.springframework.stereotype.Service;
import com.example.web_content_management_back.model.Project;
import com.example.web_content_management_back.repository.ProjectRepository;
import com.example.web_content_management_back.model.Database;
import com.example.web_content_management_back.repository.DatabaseRepository;


import java.util.List;
import java.util.stream.Collectors;
import java.util.ArrayList;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final ProjectRepository projectRepository;
    private final DatabaseRepository databaseRepository;

    public UserServiceImpl(UserRepository userRepository, UserMapper userMapper,
                           ProjectRepository projectRepository,DatabaseRepository databaseRepository) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.projectRepository = projectRepository;
        this.databaseRepository = databaseRepository;
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
   @Override
   public List<String> getUserProjects(String userId) {
       User user = userRepository.findById(userId)
               .orElseThrow(() -> new RuntimeException("User not found"));

       if (user.getProjects() == null) {
           return new ArrayList<>();
       }

       return user.getProjects().stream()
               .map(project -> project.getId())
               .collect(Collectors.toList());
   }
   @Override
   public void addProjectToUser(String userId, String projectId) {
       User user = userRepository.findById(userId)
               .orElseThrow(() -> new RuntimeException("User not found"));

       if (user.getProjects() == null) {
           user.setProjects(new ArrayList<>());
       }

       Project project = projectRepository.findById(projectId)
               .orElseThrow(() -> new RuntimeException("Project not found"));

       user.getProjects().add(project);
       userRepository.save(user);
   }
  @Override
  public List<String> getUserDatabases(String userId) {
      User user = userRepository.findById(userId)
              .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

      if (user.getDatabases() == null) {
          return new ArrayList<>();
      }

      return user.getDatabases().stream()
              .map(Database::getId)
              .collect(Collectors.toList());
  }

   @Override
   public void addDatabaseToUser(String userId, String databaseId) {
       User user = userRepository.findById(userId)
               .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

       if (user.getDatabases() == null) {
           user.setDatabases(new ArrayList<>());
       }

       Database database = databaseRepository.findById(databaseId)
               .orElseThrow(() -> new RuntimeException("Base de données introuvable"));

       user.getDatabases().add(database);
       userRepository.save(user);
   }
}