package com.kamalmedicare.controller;

import com.kamalmedicare.entity.*;
import com.kamalmedicare.service.SpecializationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/specializations")
@RequiredArgsConstructor
public class SpecializationController {

    private final SpecializationService service;

    @GetMapping
    public ResponseEntity<List<Specialization>> getAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Specialization> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @GetMapping("/{id}/subspecializations")
    public ResponseEntity<List<SubSpecialization>> getSubs(@PathVariable Long id) {
        return ResponseEntity.ok(service.getSubSpecs(id));
    }

    @PreAuthorize("hasRole('Admin')")
    @PostMapping
    public ResponseEntity<Specialization> create(
            @RequestParam String fieldname,
            @RequestParam String description,
            @RequestParam(required = false) MultipartFile image) throws IOException {
        return ResponseEntity.ok(service.create(fieldname, description, image));
    }

    @PreAuthorize("hasRole('Admin')")
    @PutMapping("/{id}")
    public ResponseEntity<Specialization> update(
            @PathVariable Long id,
            @RequestParam(required = false) String fieldname,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) MultipartFile image) throws IOException {
        return ResponseEntity.ok(service.update(id, fieldname, description, image));
    }

    @PreAuthorize("hasRole('Admin')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasRole('Admin')")
    @PostMapping("/{id}/subspecializations")
    public ResponseEntity<SubSpecialization> addSub(
            @PathVariable Long id,
            @RequestParam String name,
            @RequestParam String description,
            @RequestParam(required = false) MultipartFile image) throws IOException {
        return ResponseEntity.ok(service.addSubSpec(id, name, description, image));
    }
}
