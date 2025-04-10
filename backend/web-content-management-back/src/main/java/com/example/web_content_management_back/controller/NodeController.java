package com.example.web_content_management_back.controller;

import com.example.web_content_management_back.dto.NodeDTO;
import com.example.web_content_management_back.service.NodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/nodes")
public class NodeController {

    @Autowired
    private NodeService nodeService;

    @GetMapping
    public List<NodeDTO> getAllNodes() {
        return nodeService.getAllNodes();
    }

    @GetMapping("/{id}")
    public NodeDTO getNodeById(@PathVariable String id) {
        return nodeService.getNodeById(id);
    }

    @PostMapping
    public NodeDTO createNode(@RequestBody NodeDTO nodeDTO) {
        return nodeService.createNode(nodeDTO);
    }

    @PutMapping("/{id}")
    public NodeDTO updateNode(@PathVariable String id, @RequestBody NodeDTO nodeDTO) {
        return nodeService.updateNode(id, nodeDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteNode(@PathVariable String id) {
        nodeService.deleteNode(id);
    }

    @GetMapping("/templates")
    public List<NodeDTO> getTemplates() {
        return nodeService.getTemplates();
    }
}