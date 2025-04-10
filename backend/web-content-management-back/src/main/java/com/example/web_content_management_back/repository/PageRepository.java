package com.example.web_content_management_back.repository;

import com.example.web_content_management_back.model.Page;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PageRepository extends MongoRepository<Page, String> {
}