package com.example.web_content_management_back.repository;

import com.example.web_content_management_back.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
}