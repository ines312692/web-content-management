package com.example.web_content_management_back.repository;

import com.example.web_content_management_back.model.Node;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface NodeRepository extends MongoRepository<Node, String> {
}