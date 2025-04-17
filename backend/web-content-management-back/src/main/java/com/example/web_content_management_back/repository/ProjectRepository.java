package com.example.web_content_management_back.repository;

import com.example.web_content_management_back.model.Project;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProjectRepository extends MongoRepository<Project, String> {
}