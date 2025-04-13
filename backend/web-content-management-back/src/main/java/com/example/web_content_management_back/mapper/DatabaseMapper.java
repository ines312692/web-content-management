package com.example.web_content_management_back.mapper;

import com.example.web_content_management_back.model.Database;
import com.example.web_content_management_back.dto.DatabaseDTO;
import org.springframework.stereotype.Component;

@Component
public class DatabaseMapper {
    public DatabaseDTO toDTO(Database database) {
        DatabaseDTO dto = new DatabaseDTO();
        dto.setId(database.getId());
        dto.setName(database.getName());
        dto.setType(database.getType());
        dto.setConnectionString(database.getConnectionString());
        dto.setDescription(database.getDescription());
        dto.setUsername(database.getUsername());
        dto.setPassword(database.getPassword());
        return dto;
    }

    public Database toEntity(DatabaseDTO dto) {
        Database database = new Database();
        database.setId(dto.getId());
        database.setName(dto.getName());
        database.setType(dto.getType());
        database.setConnectionString(dto.getConnectionString());
        database.setDescription(dto.getDescription());
        database.setUsername(dto.getUsername());
        database.setPassword(dto.getPassword());
        return database;
    }
}