package com.example.web_content_management_back.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TableDTO {
    private String id;
    private String name;
    List<ColumnDTO> columns;
}