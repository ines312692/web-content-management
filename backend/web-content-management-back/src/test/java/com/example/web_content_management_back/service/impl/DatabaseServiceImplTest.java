package com.example.web_content_management_back.service.impl;

import com.example.web_content_management_back.dto.DatabaseDTO;
import org.junit.jupiter.api.Test;
import org.mockito.MockedStatic;
import org.mockito.Mockito;
import java.sql.DriverManager;
import java.sql.Connection;
import java.sql.Statement;

import static org.mockito.Mockito.*;

class DatabaseServiceImplTest {

    @Test
    void testCreatePhysicalDatabase_MySQL() throws Exception {
        Connection mockConnection = mock(Connection.class);
        Statement mockStatement = mock(Statement.class);

        try (MockedStatic<DriverManager> mockedDriverManager = Mockito.mockStatic(DriverManager.class)) {
            mockedDriverManager.when(() -> DriverManager.getConnection(
                    "jdbc:mysql://localhost:3306/", "root", "password"))
                    .thenReturn(mockConnection);

            when(mockConnection.createStatement()).thenReturn(mockStatement);

            DatabaseDTO dto = new DatabaseDTO();
            dto.setType("mysql");
            dto.setConnectionString("jdbc:mysql://localhost:3306/");
            dto.setUsername("root");
            dto.setPassword("password");
            dto.setName("test_db");

            DatabaseServiceImpl service = new DatabaseServiceImpl(null, null);
            service.createPhysicalDatabase(dto);

            verify(mockConnection).createStatement();
            verify(mockStatement).executeUpdate("CREATE DATABASE `test_db`");
            mockedDriverManager.verify(() -> DriverManager.getConnection(
                    "jdbc:mysql://localhost:3306/", "root", "password"));
        }
    }
}