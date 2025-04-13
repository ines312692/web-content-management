package com.example.web_content_management_back.mapper;

import com.example.web_content_management_back.dto.PageDTO;
import com.example.web_content_management_back.model.Page;
import org.springframework.stereotype.Component;

@Component
public class PageMapper {

    public PageDTO toDTO(Page page) {
        PageDTO pageDTO = new PageDTO();
        pageDTO.setId(page.getId());
        pageDTO.setName(page.getName());
        pageDTO.setLayout(new LayoutMapper().toDTO(page.getLayout()));
        return pageDTO;
    }

    public Page toEntity(PageDTO pageDTO) {
    if (pageDTO == null) {
            return null;
        }
        Page page = new Page();
        page.setId(pageDTO.getId());
        page.setName(pageDTO.getName());
        page.setLayout(new LayoutMapper().toEntity(pageDTO.getLayout()));
        return page;
    }
}