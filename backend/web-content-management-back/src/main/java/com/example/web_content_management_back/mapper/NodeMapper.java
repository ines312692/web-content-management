package com.example.web_content_management_back.mapper;

import com.example.web_content_management_back.dto.NodeDTO;
import com.example.web_content_management_back.model.Node;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class NodeMapper {

    public NodeDTO toDTO(Node node) {
        return toDTO(node, new HashSet<>());
    }

    private NodeDTO toDTO(Node node, Set<String> visitedNodes) {
        if (node == null || visitedNodes.contains(node.getId())) {
            return null;
        }
        visitedNodes.add(node.getId());
        NodeDTO nodeDTO = new NodeDTO();
        nodeDTO.setId(node.getId());
        nodeDTO.setName(node.getName());
        nodeDTO.setType(node.getType());
        nodeDTO.setSelected(node.isSelected());
        nodeDTO.setDescription(node.getDescription());
        nodeDTO.setWidgetId(node.getWidgetId());
        nodeDTO.setWidth(node.getWidth());
        nodeDTO.setHeight(node.getHeight());
        nodeDTO.setBackgroundColor(node.getBackgroundColor());
        nodeDTO.setBorderColor(node.getBorderColor());
        nodeDTO.setTemplate(node.isTemplate());
        nodeDTO.setChildren(toDTOList(node.getChildren(), visitedNodes));
        nodeDTO.setParent(node.getParent() != null ? toSimpleDTO(node.getParent()) : null);
        return nodeDTO;
    }

    private List<NodeDTO> toDTOList(List<Node> nodes, Set<String> visitedNodes) {
        if (nodes == null) {
            return null;
        }
        return nodes.stream()
                .map(node -> toDTO(node, visitedNodes))
                .collect(Collectors.toList());
    }

    private NodeDTO toSimpleDTO(Node node) {
        if (node == null) {
            return null;
        }
        NodeDTO nodeDTO = new NodeDTO();
        nodeDTO.setId(node.getId());
        nodeDTO.setName(node.getName());
        nodeDTO.setType(node.getType());
        return nodeDTO;
    }

    public Node toEntity(NodeDTO nodeDTO) {
        return toEntity(nodeDTO, new HashSet<>());
    }

    private Node toEntity(NodeDTO nodeDTO, Set<String> visitedNodes) {
        if (nodeDTO == null || visitedNodes.contains(nodeDTO.getId())) {
            return null;
        }
        visitedNodes.add(nodeDTO.getId());
        Node node = new Node();
        node.setId(nodeDTO.getId());
        node.setName(nodeDTO.getName());
        node.setType(nodeDTO.getType());
        node.setSelected(nodeDTO.isSelected());
        node.setDescription(nodeDTO.getDescription());
        node.setWidgetId(nodeDTO.getWidgetId());
        node.setWidth(nodeDTO.getWidth());
        node.setHeight(nodeDTO.getHeight());
        node.setBackgroundColor(nodeDTO.getBackgroundColor());
        node.setBorderColor(nodeDTO.getBorderColor());
        node.setTemplate(nodeDTO.isTemplate());
        node.setChildren(toEntityList(nodeDTO.getChildren(), visitedNodes));
        node.setParent(nodeDTO.getParent() != null ? toEntity(nodeDTO.getParent(), visitedNodes) : null);
        return node;
    }

    private List<Node> toEntityList(List<NodeDTO> nodeDTOs, Set<String> visitedNodes) {
        if (nodeDTOs == null) {
            return null;
        }
        return nodeDTOs.stream()
                .map(nodeDTO -> toEntity(nodeDTO, visitedNodes))
                .collect(Collectors.toList());
    }
}