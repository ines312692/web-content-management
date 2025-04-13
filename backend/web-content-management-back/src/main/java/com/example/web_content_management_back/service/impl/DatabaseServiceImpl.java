package com.example.web_content_management_back.service.impl;

import com.example.web_content_management_back.dto.DatabaseDTO;
import com.example.web_content_management_back.dto.TableDTO;
import com.example.web_content_management_back.dto.ColumnDTO;
import com.example.web_content_management_back.mapper.DatabaseMapper;
import com.example.web_content_management_back.model.Database;
import com.example.web_content_management_back.repository.DatabaseRepository;
import com.example.web_content_management_back.service.DatabaseService;
import org.springframework.stereotype.Service;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

import java.util.List;
import java.util.stream.Collectors;
import java.util.ArrayList;
import java.util.UUID;

@Service
public class DatabaseServiceImpl implements DatabaseService {
    private final DatabaseRepository repository;
    private final DatabaseMapper mapper;

    public DatabaseServiceImpl(DatabaseRepository repository, DatabaseMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    @Override
    public List<DatabaseDTO> getAllDatabases() {
        return repository.findAll().stream()
                .map(mapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public DatabaseDTO getDatabaseById(String id) {
        return repository.findById(id)
                .map(mapper::toDTO)
                .orElseThrow(() -> new RuntimeException("Database not found"));
    }


    @Override
    public DatabaseDTO updateDatabase(String id, DatabaseDTO dto) {
        Database database = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Database not found"));
        database.setName(dto.getName());
        database.setType(dto.getType());
        database.setConnectionString(dto.getConnectionString());
        database.setDescription(dto.getDescription());
        database.setUsername(dto.getUsername());
        database.setPassword(dto.getPassword());
        return mapper.toDTO(repository.save(database));
    }

    @Override
    public void deleteDatabase(String id) {
        repository.deleteById(id);
    }
    @Override
    public DatabaseDTO createDatabase(DatabaseDTO dto) {
        validateDatabaseDTO(dto);
        createPhysicalDatabase(dto);

        Database database = mapper.toEntity(dto);
        return mapper.toDTO(repository.save(database));
    }

    protected void createPhysicalDatabase(DatabaseDTO dto) {
        String type = dto.getType();
        String dbName = dto.getName();

        try {
            switch (type.toLowerCase()) {
                case "mysql":
                case "postgresql":
                    createInMemoryDatabase(dbName);
                    break;
                case "h2-file":
                    createFileBasedDatabase(dbName);
                    break;
                default:
                    throw new UnsupportedOperationException("Type de base de données non supporté : " + type);
            }
        } catch (Exception e) {
            throw new RuntimeException("Erreur lors de la création de la base de données : " + e.getMessage(), e);
        }
    }

    private void createFileBasedDatabase(String dbName) throws Exception {
        try (Connection connection = DriverManager.getConnection("jdbc:h2:./data/" + dbName, "sa", "")) {
            String sql = "CREATE SCHEMA IF NOT EXISTS " + dbName;
            try (Statement statement = connection.createStatement()) {
                statement.executeUpdate(sql);
            }
        }
    }
    private void validateDatabaseDTO(DatabaseDTO dto) {
        if (dto.getName() == null || dto.getName().isEmpty()) {
            throw new IllegalArgumentException("Le nom de la base de données est requis.");
        }
        if (dto.getType() == null || dto.getType().isEmpty()) {
            throw new IllegalArgumentException("Le type de la base de données est requis.");
        }
    }

    private void createInMemoryDatabase(String dbName) throws Exception {
        try (Connection connection = DriverManager.getConnection("jdbc:h2:mem:" + dbName, "sa", "")) {
            String sql = "CREATE SCHEMA IF NOT EXISTS " + dbName;
            try (Statement statement = connection.createStatement()) {
                statement.executeUpdate(sql);
            }
        }
    }
   @Override
   public void addTableToDatabase(String databaseId, String tableName) {
       Database database = repository.findById(databaseId)
               .orElseThrow(() -> new RuntimeException("Database not found"));

       String tableId = java.util.UUID.randomUUID().toString();

       try (Connection connection = DriverManager.getConnection(
               "jdbc:h2:file:./data/" + database.getName(), "sa", "")) {
           String sql = "CREATE TABLE IF NOT EXISTS " + tableName + " (id INT PRIMARY KEY)";
           try (Statement statement = connection.createStatement()) {
               statement.executeUpdate(sql);
           }
       } catch (Exception e) {
           throw new RuntimeException("Erreur lors de l'ajout de la table : " + e.getMessage(), e);
       }


       System.out.println("Table ajoutée avec ID : " + tableId);
   }
   @Override
   public void addColumnToTable(String databaseId, String tableName, String columnName, String columnType) {
       Database database = repository.findById(databaseId)
               .orElseThrow(() -> new RuntimeException("Database not found"));

       String columnId = java.util.UUID.randomUUID().toString();

       try (Connection connection = DriverManager.getConnection(database.getConnectionString(), database.getUsername(), database.getPassword())) {
           String sql = "ALTER TABLE " + tableName + " ADD COLUMN " + columnName + " " + columnType;
           try (Statement statement = connection.createStatement()) {
               statement.executeUpdate(sql);
           }
       } catch (Exception e) {
           throw new RuntimeException("Erreur lors de l'ajout de la colonne : " + e.getMessage(), e);
       }


       System.out.println("Colonne ajoutée avec ID : " + columnId);
   }
    @Override
    public List<TableDTO> getTables(String databaseId) {
        Database database = repository.findById(databaseId)
                .orElseThrow(() -> new RuntimeException("Database not found"));

        try (Connection connection = DriverManager.getConnection(
                "jdbc:h2:file:./data/" + database.getName(), "sa", "")) {
            String sql = "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'PUBLIC'";
            try (Statement statement = connection.createStatement();
                 var resultSet = statement.executeQuery(sql)) {
                List<TableDTO> tables = new ArrayList<>();
                while (resultSet.next()) {
                    String tableName = resultSet.getString("TABLE_NAME");
                    List<ColumnDTO> columns = getColumns(databaseId, tableName);
                    tables.add(new TableDTO(UUID.randomUUID().toString(), tableName, columns)); // Génère un ID unique
                }
                return tables;
            }
        } catch (Exception e) {
            throw new RuntimeException("Erreur lors de la récupération des tables : " + e.getMessage(), e);
        }
    }
  @Override
  public List<ColumnDTO> getColumns(String databaseId, String tableName) {
      Database database = repository.findById(databaseId)
              .orElseThrow(() -> new RuntimeException("Database not found"));

      try (Connection connection = DriverManager.getConnection(
              "jdbc:h2:file:./data/" + database.getName(), "sa", "")) {
          String sql = "SELECT COLUMN_NAME, DATA_TYPE FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '" + tableName.toUpperCase() + "'";
          try (Statement statement = connection.createStatement();
               var resultSet = statement.executeQuery(sql)) {
              List<ColumnDTO> columns = new ArrayList<>();
              while (resultSet.next()) {
                  String columnName = resultSet.getString("COLUMN_NAME");
                  String columnType = resultSet.getString("DATA_TYPE");
                  columns.add(new ColumnDTO(UUID.randomUUID().toString(), columnName, columnType)); // Génère un ID unique
              }
              return columns;
          }
      } catch (Exception e) {
          throw new RuntimeException("Erreur lors de la récupération des colonnes : " + e.getMessage(), e);
      }
  }
 @Override
 public void deleteTable(String databaseId, String tableName) {
     Database database = repository.findById(databaseId)
             .orElseThrow(() -> new RuntimeException("Database not found"));

     try (Connection connection = DriverManager.getConnection(
             "jdbc:h2:file:./data/" + database.getName(), "sa", "")) {
         String sql = "DROP TABLE IF EXISTS " + tableName;
         try (Statement statement = connection.createStatement()) {
             statement.executeUpdate(sql);
         }
     } catch (Exception e) {
         throw new RuntimeException("Erreur lors de la suppression de la table : " + e.getMessage(), e);
     }

     System.out.println("Table supprimée : " + tableName);
 }
    }