package com.example.web_content_management_back.controller;

import com.example.web_content_management_back.dto.PageDTO;
import com.example.web_content_management_back.service.PageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pages")
public class PageController {

    @Autowired
    private PageService pageService;

    @GetMapping
    public List<PageDTO> getAllPages() {
        return pageService.getAllPages();
    }

    @PostMapping
    public PageDTO createPage(@RequestBody PageDTO pageDTO) {
        return pageService.createPage(pageDTO);
    }

    @GetMapping("/{id}")
    public PageDTO getPageById(@PathVariable String id) {
        return pageService.getPageById(id);
    }

    @PutMapping("/{id}")
    public PageDTO updatePage(@PathVariable String id, @RequestBody PageDTO pageDTO) {
        return pageService.updatePage(id, pageDTO);
    }

    @DeleteMapping("/{id}")
    public void deletePage(@PathVariable String id) {
        pageService.deletePage(id);
    }
}