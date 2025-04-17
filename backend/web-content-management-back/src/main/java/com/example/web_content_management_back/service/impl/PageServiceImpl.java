package com.example.web_content_management_back.service.impl;

import com.example.web_content_management_back.dto.PageDTO;
import com.example.web_content_management_back.mapper.PageMapper;
import com.example.web_content_management_back.model.Layout;
import com.example.web_content_management_back.model.Page;
import com.example.web_content_management_back.repository.LayoutRepository;
import com.example.web_content_management_back.repository.PageRepository;
import com.example.web_content_management_back.service.PageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PageServiceImpl implements PageService {

    @Autowired
    private PageRepository pageRepository;

    @Autowired
    private LayoutRepository layoutRepository;

    @Autowired
    private PageMapper pageMapper;

    @Override
    public List<PageDTO> getAllPages() {
        return pageRepository.findAll().stream()
                .map(pageMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public PageDTO createPage(PageDTO pageDTO) {
        Page page = pageMapper.toEntity(pageDTO);

        if (pageDTO.getLayout() != null && pageDTO.getLayout().getId() != null) {
            Layout layout = layoutRepository.findById(pageDTO.getLayout().getId())
                    .orElseThrow(() -> new RuntimeException("Layout not found"));
            page.setLayout(layout);
        } else {
            page.setLayout(null);
        }

        page = pageRepository.save(page);
        return pageMapper.toDTO(page);
    }

    @Override
    public PageDTO getPageById(String id) {
        return pageRepository.findById(id)
                .map(pageMapper::toDTO)
                .orElse(null);
    }

    @Override
    public PageDTO updatePage(String id, PageDTO pageDTO) {
        if (pageRepository.existsById(id)) {
            Page page = pageMapper.toEntity(pageDTO);
            Layout layout = layoutRepository.findById(pageDTO.getLayout().getId())
                    .orElseThrow(() -> new RuntimeException("Layout not found"));
            page.setLayout(layout);

            page.setId(id);
            page = pageRepository.save(page);
            return pageMapper.toDTO(page);
        }
        return null;
    }

    @Override
    public void deletePage(String id) {
        pageRepository.deleteById(id);
    }
}