package com.example.web_content_management_back.service;

import com.example.web_content_management_back.dto.DatabaseDTO;
import com.example.web_content_management_back.dto.TableDTO;
import com.example.web_content_management_back.dto.ColumnDTO;

import java.util.List;


public interface DatabaseService {
    List<DatabaseDTO> getAllDatabases();
    DatabaseDTO getDatabaseById(String id);
    DatabaseDTO createDatabase(DatabaseDTO dto);
    DatabaseDTO updateDatabase(String id, DatabaseDTO dto);
    void deleteDatabase(String id);
    public void addTableToDatabase(String databaseId, String tableName);
    public void addColumnToTable(String databaseId, String tableName, String columnName, String columnType);
    List<TableDTO> getTables(String databaseId);
    List<ColumnDTO> getColumns(String databaseId, String tableName);
    void deleteTable(String databaseId, String tableName);
}