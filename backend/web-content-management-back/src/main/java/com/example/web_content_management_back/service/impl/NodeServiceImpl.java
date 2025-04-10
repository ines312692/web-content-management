package com.example.web_content_management_back.service.impl;

import com.example.web_content_management_back.dto.NodeDTO;
import com.example.web_content_management_back.model.Node;
import com.example.web_content_management_back.repository.NodeRepository;
import com.example.web_content_management_back.service.NodeService;
import com.example.web_content_management_back.mapper.NodeMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class NodeServiceImpl implements NodeService {

    @Autowired
    private NodeRepository nodeRepository;

    @Autowired
    private NodeMapper nodeMapper;

    @Override
    public List<NodeDTO> getAllNodes() {
        return nodeRepository.findAll().stream()
                .map(nodeMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public NodeDTO createNode(NodeDTO nodeDTO) {
        Node node = nodeMapper.toEntity(nodeDTO);
        node = nodeRepository.save(node);
        return nodeMapper.toDTO(node);
    }

    @Override
    public NodeDTO getNodeById(String id) {
        return nodeRepository.findById(id)
                .map(nodeMapper::toDTO)
                .orElse(null);
    }

    @Override
    public NodeDTO updateNode(String id, NodeDTO nodeDTO) {
        if (nodeRepository.existsById(id)) {
            Node node = nodeMapper.toEntity(nodeDTO);
            node.setId(id);
            node = nodeRepository.save(node);
            return nodeMapper.toDTO(node);
        }
        return null;
    }

    @Override
    public void deleteNode(String id) {
        nodeRepository.deleteById(id);
    }


    @Override
    public List<NodeDTO> getTemplates() {
        return nodeRepository.findAll().stream()
                .filter(Node::isTemplate)
                .map(nodeMapper::toDTO)
                .collect(Collectors.toList());
    }
}