package com.kamalmedicare.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "appointment")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long appointmentid;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor")
    private Doctor doctor;

    @Column(name = "appointmentdate")
    private LocalDateTime appointmentdate = LocalDateTime.now();

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "enum('Scheduled','Completed','Canceled')")
    private Status status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user")
    private User user;

    @Pattern(regexp = "^[0-9]{10}$")
    @Column(name = "mobileno", length = 10)
    private String mobileno;

    public enum Status {
        Scheduled, Completed, Canceled
    }
}
