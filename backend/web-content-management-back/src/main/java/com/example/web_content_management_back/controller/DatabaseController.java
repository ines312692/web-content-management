package com.example.web_content_management_back.controller;

import com.example.web_content_management_back.dto.DatabaseDTO;
import com.example.web_content_management_back.service.DatabaseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import com.example.web_content_management_back.dto.TableDTO;
import com.example.web_content_management_back.dto.ColumnDTO;

@RestController
@RequestMapping("databases")
public class DatabaseController {
    private final DatabaseService service;

    public DatabaseController(DatabaseService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<DatabaseDTO>> getAllDatabases() {
        return ResponseEntity.ok(service.getAllDatabases());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DatabaseDTO> getDatabaseById(@PathVariable String id) {
        return ResponseEntity.ok(service.getDatabaseById(id));
    }

    @PostMapping
    public ResponseEntity<DatabaseDTO> createDatabase(@RequestBody DatabaseDTO dto) {
        return ResponseEntity.ok(service.createDatabase(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DatabaseDTO> updateDatabase(@PathVariable String id, @RequestBody DatabaseDTO dto) {
        return ResponseEntity.ok(service.updateDatabase(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDatabase(@PathVariable String id) {
        service.deleteDatabase(id);
        return ResponseEntity.noContent().build();
    }

   @PostMapping("/{id}/tables")
   public ResponseEntity<Void> addTableToDatabase(@PathVariable String id, @RequestBody Map<String, String> request) {
       String tableName = request.get("tableName");
       if (tableName == null || tableName.isEmpty()) {
           throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Le paramètre 'tableName' est requis.");
       }
       service.addTableToDatabase(id, tableName);
       return ResponseEntity.ok().build();
   }

    @PostMapping("/{id}/tables/{tableName}/columns")
    public ResponseEntity<Void> addColumnToTable(
            @PathVariable String id,
            @PathVariable String tableName,
            @RequestParam String columnName,
            @RequestParam String columnType) {
        service.addColumnToTable(id, tableName, columnName, columnType);
        return ResponseEntity.ok().build();
    }

   @GetMapping("/{id}/tables")
   public ResponseEntity<List<TableDTO>> getTables(@PathVariable String id) {
       List<TableDTO> tables = service.getTables(id);
       return ResponseEntity.ok(tables);
   }

   @GetMapping("/{id}/tables/{tableName}/columns")
   public ResponseEntity<List<ColumnDTO>> getColumns(
           @PathVariable String id,
           @PathVariable String tableName) {
       List<ColumnDTO> columns = service.getColumns(id, tableName);
       return ResponseEntity.ok(columns);
   }
    @DeleteMapping("/{id}/tables/{tableName}")
    public ResponseEntity<Void> deleteTable(
            @PathVariable String id,
            @PathVariable String tableName) {
        service.deleteTable(id, tableName);
        return ResponseEntity.noContent().build();
    }
}