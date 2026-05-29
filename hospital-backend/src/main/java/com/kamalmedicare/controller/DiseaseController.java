package com.kamalmedicare.controller;

import com.kamalmedicare.entity.Disease;
import com.kamalmedicare.service.DiseaseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/diseases")
@RequiredArgsConstructor
public class DiseaseController {
    private final DiseaseService service;

    @GetMapping
    public ResponseEntity<List<Disease>> getAll() { return ResponseEntity.ok(service.findAll()); }

    @GetMapping("/{id}")
    public ResponseEntity<Disease> getById(@PathVariable Long id) { return ResponseEntity.ok(service.findById(id)); }

    @PreAuthorize("hasRole('Admin')")
    @PostMapping
    public ResponseEntity<Disease> create(
            @RequestParam String name, @RequestParam String description,
            @RequestParam(required = false) List<MultipartFile> images) throws IOException {
        return ResponseEntity.ok(service.create(name, description, images));
    }

    @PreAuthorize("hasRole('Admin')")
    @PutMapping("/{id}")
    public ResponseEntity<Disease> update(
            @PathVariable Long id,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) List<MultipartFile> images) throws IOException {
        return ResponseEntity.ok(service.update(id, name, description, images));
    }

    @PreAuthorize("hasRole('Admin')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
