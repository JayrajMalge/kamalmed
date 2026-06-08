package com.kamalmedicare.controller;

import com.kamalmedicare.entity.Treatment;
import com.kamalmedicare.service.TreatmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/treatments")
@RequiredArgsConstructor
public class TreatmentController {
    private final TreatmentService service;

    @GetMapping
    public ResponseEntity<List<Treatment>> getAll() { return ResponseEntity.ok(service.findAll()); }

    @GetMapping("/{id}")
    public ResponseEntity<Treatment> getById(@PathVariable Long id) { return ResponseEntity.ok(service.findById(id)); }

    @PreAuthorize("hasRole('Admin')")
    @PostMapping
    public ResponseEntity<Treatment> create(@Valid @RequestBody Treatment t) { return ResponseEntity.ok(service.create(t)); }

    @PreAuthorize("hasRole('Admin')")
    @PutMapping("/{id}")
    public ResponseEntity<Treatment> update(@PathVariable Long id, @RequestBody Treatment t) { return ResponseEntity.ok(service.update(id, t)); }

    @PreAuthorize("hasRole('Admin')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
