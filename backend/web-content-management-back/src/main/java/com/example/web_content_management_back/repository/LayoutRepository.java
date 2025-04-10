package com.example.web_content_management_back.repository;

import com.example.web_content_management_back.model.Layout;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface LayoutRepository extends MongoRepository<Layout, String> {
}