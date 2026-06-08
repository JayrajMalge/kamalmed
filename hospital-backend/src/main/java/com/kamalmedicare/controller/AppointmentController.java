package com.kamalmedicare.controller;

import com.kamalmedicare.entity.Appointment;
import com.kamalmedicare.repository.AppointmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentRepository appointmentRepo;

    @PreAuthorize("hasRole('Admin')")
    @GetMapping
    public ResponseEntity<List<Appointment>> getAll() {
        return ResponseEntity.ok(appointmentRepo.findAllByOrderByAppointmentdateDesc());
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping
    public ResponseEntity<Appointment> book(@RequestBody Appointment appointment) {
        appointment.setStatus(Appointment.Status.Scheduled);
        return ResponseEntity.ok(appointmentRepo.save(appointment));
    }

    @PreAuthorize("hasRole('Admin')")
    @PutMapping("/{id}/status")
    public ResponseEntity<Appointment> updateStatus(@PathVariable Long id, @RequestParam String status) {
        Appointment a = appointmentRepo.findById(id).orElseThrow();
        a.setStatus(Appointment.Status.valueOf(status));
        return ResponseEntity.ok(appointmentRepo.save(a));
    }

    @PreAuthorize("hasRole('Admin')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        appointmentRepo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
