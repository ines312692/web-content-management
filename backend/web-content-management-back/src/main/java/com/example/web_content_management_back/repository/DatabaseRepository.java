package com.example.web_content_management_back.repository;

import com.example.web_content_management_back.model.Database;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DatabaseRepository extends MongoRepository<Database, String> {
}