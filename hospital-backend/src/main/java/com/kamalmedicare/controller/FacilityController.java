package com.kamalmedicare.controller;

import com.kamalmedicare.entity.Facility;
import com.kamalmedicare.service.FacilityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/facilities")
@RequiredArgsConstructor
public class FacilityController {
    private final FacilityService service;

    @GetMapping
    public ResponseEntity<List<Facility>> getAll() { return ResponseEntity.ok(service.findAll()); }

    @GetMapping("/{id}")
    public ResponseEntity<Facility> getById(@PathVariable Long id) { return ResponseEntity.ok(service.findById(id)); }

    @PreAuthorize("hasRole('Admin')")
    @PostMapping
    public ResponseEntity<Facility> create(
            @RequestParam String facilityname, @RequestParam String description,
            @RequestParam(required = false) String facilitytype,
            @RequestParam(defaultValue = "yes") String availability,
            @RequestParam(required = false) List<MultipartFile> images) throws IOException {
        return ResponseEntity.ok(service.create(facilityname, description, facilitytype, availability, images));
    }

    @PreAuthorize("hasRole('Admin')")
    @PutMapping("/{id}")
    public ResponseEntity<Facility> update(
            @PathVariable Long id,
            @RequestParam(required = false) String facilityname,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) String facilitytype,
            @RequestParam(required = false) String availability,
            @RequestParam(required = false) List<MultipartFile> images) throws IOException {
        return ResponseEntity.ok(service.update(id, facilityname, description, facilitytype, availability, images));
    }

    @PreAuthorize("hasRole('Admin')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
