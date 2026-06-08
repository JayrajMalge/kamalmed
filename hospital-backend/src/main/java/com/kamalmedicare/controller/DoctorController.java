package com.kamalmedicare.controller;

import com.kamalmedicare.entity.Doctor;
import com.kamalmedicare.service.DoctorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/doctors")
@RequiredArgsConstructor
public class DoctorController {
    private final DoctorService service;

    @GetMapping
    public ResponseEntity<List<Doctor>> getAll() { return ResponseEntity.ok(service.findAll()); }

    @GetMapping("/{id}")
    public ResponseEntity<Doctor> getById(@PathVariable Long id) { return ResponseEntity.ok(service.findById(id)); }

    @PreAuthorize("hasRole('Admin')")
    @PostMapping
    public ResponseEntity<Doctor> create(
            @RequestPart Doctor doctor,
            @RequestPart(required = false) MultipartFile photo,
            @RequestParam(required = false) List<Long> specIds) throws IOException {
        return ResponseEntity.ok(service.create(doctor, photo, specIds));
    }

    @PreAuthorize("hasRole('Admin')")
    @PutMapping("/{id}")
    public ResponseEntity<Doctor> update(
            @PathVariable Long id,
            @RequestPart Doctor doctor,
            @RequestPart(required = false) MultipartFile photo) throws IOException {
        return ResponseEntity.ok(service.update(id, doctor, photo));
    }

    @PreAuthorize("hasRole('Admin')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
