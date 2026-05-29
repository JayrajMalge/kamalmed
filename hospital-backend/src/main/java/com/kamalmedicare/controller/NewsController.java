package com.kamalmedicare.controller;

import com.kamalmedicare.entity.News;
import com.kamalmedicare.service.NewsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/news")
@RequiredArgsConstructor
public class NewsController {
    private final NewsService service;

    @GetMapping
    public ResponseEntity<List<News>> getAll(@RequestParam(required = false) String type) {
        return ResponseEntity.ok(type != null ? service.findByType(type) : service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<News> getById(@PathVariable Long id) { return ResponseEntity.ok(service.findById(id)); }

    @PreAuthorize("hasRole('Admin')")
    @PostMapping
    public ResponseEntity<News> create(
            @RequestParam String title, @RequestParam String description,
            @RequestParam(required = false) String newstype,
            @RequestParam(required = false) List<MultipartFile> images) throws IOException {
        return ResponseEntity.ok(service.create(title, description, newstype, images));
    }

    @PreAuthorize("hasRole('Admin')")
    @PutMapping("/{id}")
    public ResponseEntity<News> update(
            @PathVariable Long id,
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) String newstype,
            @RequestParam(required = false) List<MultipartFile> images) throws IOException {
        return ResponseEntity.ok(service.update(id, title, description, newstype, images));
    }

    @PreAuthorize("hasRole('Admin')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
