package com.example.web_content_management_back.service;

import com.example.web_content_management_back.dto.NodeDTO;

import java.util.List;

public interface NodeService {
    List<NodeDTO> getAllNodes();
    NodeDTO createNode(NodeDTO nodeDTO);
    NodeDTO getNodeById(String id);
    NodeDTO updateNode(String id, NodeDTO nodeDTO);
    void deleteNode(String id);
    List<NodeDTO> getTemplates();
}