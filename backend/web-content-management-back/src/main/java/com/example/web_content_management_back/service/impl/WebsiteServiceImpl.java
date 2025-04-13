package com.example.web_content_management_back.service.impl;

import com.example.web_content_management_back.dto.LayoutDTO;
import com.example.web_content_management_back.dto.PageDTO;
import com.example.web_content_management_back.dto.WebsiteDTO;
import com.example.web_content_management_back.mapper.WebsiteMapper;
import com.example.web_content_management_back.model.Layout;
import com.example.web_content_management_back.model.Page;
import com.example.web_content_management_back.model.Website;
import com.example.web_content_management_back.repository.PageRepository;
import com.example.web_content_management_back.repository.WebsiteRepository;
import com.example.web_content_management_back.service.WebsiteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.web_content_management_back.dto.NodeDTO;
import com.example.web_content_management_back.model.Node;
import com.example.web_content_management_back.mapper.LayoutMapper;
import com.example.web_content_management_back.repository.LayoutRepository;
import com.example.web_content_management_back.repository.NodeRepository;
import com.example.web_content_management_back.repository.DatabaseRepository;
import com.example.web_content_management_back.mapper.DatabaseMapper;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class WebsiteServiceImpl implements WebsiteService {

    @Autowired
    private WebsiteRepository websiteRepository;

    @Autowired
    private PageRepository pageRepository;

    @Autowired
    private WebsiteMapper websiteMapper;

    @Autowired
    private LayoutMapper layoutMapper;

    @Autowired
    private DatabaseMapper databaseMapper;

    @Autowired
    private LayoutRepository layoutRepository;

    @Autowired
    private NodeRepository nodeRepository;

    @Autowired
    private DatabaseRepository databaseRepository;

    @Override
    public List<WebsiteDTO> getAllWebsites() {
        return websiteRepository.findAll().stream()
                .map(websiteMapper::toDTO)
                .collect(Collectors.toList());
    }

  @Override
  public WebsiteDTO createWebsite(WebsiteDTO websiteDTO) {
      if (websiteDTO == null) {
          throw new IllegalArgumentException("WebsiteDTO cannot be null");
      }

      if (websiteDTO.getPages() == null) {
          websiteDTO.setPages(Collections.emptyList());
      }

      Website website = websiteMapper.toEntity(websiteDTO);
      website.setId(UUID.randomUUID().toString());

      List<Page> pages = websiteDTO.getPages().stream()
              .map(pageDTO -> {
                  if (pageDTO.getId() == null) {
                      Page newPage = new Page();
                      newPage.setId(UUID.randomUUID().toString());
                      newPage.setName(pageDTO.getName());
                      return pageRepository.save(newPage);
                  } else {
                      return pageRepository.findById(pageDTO.getId())
                              .orElseThrow(() -> new IllegalArgumentException("Page not found with ID: " + pageDTO.getId()));
                  }
              })
              .collect(Collectors.toList());
      website.setPages(pages);

      if (websiteDTO.getDatabase() != null) {
          website.setDatabase(databaseMapper.toEntity(websiteDTO.getDatabase()));
      }

      Website savedWebsite = websiteRepository.save(website);
      return websiteMapper.toDTO(savedWebsite);
  }

    @Override
    public WebsiteDTO getWebsiteById(String id) {
        if (id == null || id.isEmpty()) {
            throw new IllegalArgumentException("Website ID cannot be null or empty");
        }

        Website website = websiteRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Website not found with ID: " + id));
        return websiteMapper.toDTO(website);
    }

    @Override
    public WebsiteDTO updateWebsite(String id, WebsiteDTO websiteDTO) {
        if (id == null || id.isEmpty() || websiteDTO == null) {
            throw new IllegalArgumentException("Website ID or WebsiteDTO cannot be null or empty");
        }

        Website website = websiteMapper.toEntity(websiteDTO);
        website.setId(id);

        List<Page> pages = websiteDTO.getPages() != null ? websiteDTO.getPages().stream()
                .map(pageDTO -> pageRepository.findById(pageDTO.getId())
                        .orElseThrow(() -> new IllegalArgumentException("Page not found with ID: " + pageDTO.getId())))
                .collect(Collectors.toList()) : Collections.emptyList();
        website.setPages(pages);

       if (websiteDTO.getDatabase() != null) {
                   website.setDatabase(databaseMapper.toEntity(websiteDTO.getDatabase()));
               }

        Website updatedWebsite = websiteRepository.save(website);
        return websiteMapper.toDTO(updatedWebsite);
    }

    @Override
    public void deleteWebsite(String id) {
        if (id == null || id.isEmpty()) {
            throw new IllegalArgumentException("Website ID cannot be null or empty");
        }

        Website website = websiteRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Website not found with ID: " + id));

        if (website.getPages() != null) {
            for (Page page : website.getPages()) {
                if (page != null) {
                    if (page.getLayout() != null) {
                        Layout layout = page.getLayout();
                        if (layout.getNodes() != null) {
                            for (Node node : layout.getNodes()) {
                                nodeRepository.deleteById(node.getId());
                            }
                        }
                        layoutRepository.deleteById(layout.getId());
                    }
                    pageRepository.deleteById(page.getId());
                }
            }
        }
        if (website.getDatabase() != null) {
                databaseRepository.deleteById(website.getDatabase().getId());
            }

        websiteRepository.deleteById(id);
    }

    @Override
    public List<PageDTO> getPagesByWebsiteId(String websiteId) {
        if (websiteId == null || websiteId.isEmpty()) {
            throw new IllegalArgumentException("Website ID cannot be null or empty");
        }

        Website website = websiteRepository.findById(websiteId)
                .orElseThrow(() -> new IllegalArgumentException("Website not found with ID: " + websiteId));
        return website.getPages() != null ? website.getPages().stream()
                .map(websiteMapper::toPageDTO)
                .collect(Collectors.toList()) : Collections.emptyList();
    }

    @Override
    public PageDTO addPageToWebsite(String websiteId, PageDTO pageDTO) {
        if (websiteId == null || websiteId.isEmpty() || pageDTO == null) {
            throw new IllegalArgumentException("Website ID ou PageDTO ne peut pas être null ou vide");
        }

        Website website = websiteRepository.findById(websiteId)
                .orElseThrow(() -> new IllegalArgumentException("Website introuvable avec l'ID : " + websiteId));

        if (website.getPages() == null) {
            website.setPages(new ArrayList<>());
        }

        Page page = new Page();
        page.setId(UUID.randomUUID().toString());
        page.setName(pageDTO.getName());

        if (pageDTO.getLayout() != null) {
            Layout layout = layoutMapper.toEntity(pageDTO.getLayout());
            layout.setId(UUID.randomUUID().toString());

            if (pageDTO.getLayout().getNodes() != null && !pageDTO.getLayout().getNodes().isEmpty()) {
                List<Node> savedNodes = pageDTO.getLayout().getNodes().stream()
                        .map(nodeDTO -> {
                            Node node = new Node();
                            node.setId(UUID.randomUUID().toString());
                            node.setName(nodeDTO.getName());
                            node.setType(nodeDTO.getType());
                            return nodeRepository.save(node);
                        })
                        .collect(Collectors.toList());
                layout.setNodes(savedNodes);
            }

            layout = layoutRepository.save(layout);
            page.setLayout(layout);
        }

        page = pageRepository.save(page);
        website.getPages().add(page);
        websiteRepository.save(website);

        pageDTO.setId(page.getId());
        pageDTO.setLayout(layoutMapper.toDTO(page.getLayout()));
        return pageDTO;
    }

    @Override
    public String deletePageFromWebsite(String websiteId, String pageId) {
        if (websiteId == null || websiteId.isEmpty() || pageId == null || pageId.isEmpty()) {
            throw new IllegalArgumentException("Website ID ou Page ID ne peut pas être null ou vide");
        }

        Website website = websiteRepository.findById(websiteId)
                .orElseThrow(() -> new IllegalArgumentException("Website introuvable avec l'ID : " + websiteId));

        Page page = pageRepository.findById(pageId)
                .orElseThrow(() -> new IllegalArgumentException("Page introuvable avec l'ID : " + pageId));

        if (website.getPages() != null && website.getPages().contains(page)) {
            website.getPages().remove(page);

            if (page.getLayout() != null) {
                Layout layout = page.getLayout();
                if (layout.getNodes() != null) {
                    for (Node node : layout.getNodes()) {
                        nodeRepository.deleteById(node.getId());
                    }
                }
                layoutRepository.deleteById(layout.getId());
            }

            pageRepository.deleteById(pageId);
            websiteRepository.save(website);
            return "Page supprimée avec succès";
        } else {
            return "Échec : La page n'appartient pas au site web spécifié.";
        }
    }
}