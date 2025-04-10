package com.example.web_content_management_back.exception;

public class NodeNotFoundException extends RuntimeException {
    public NodeNotFoundException(Long id) {
        super("Node not found with id: " + id);
    }
}