package com.kamalmedicare.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "doctor_speacialization")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DoctorSpecialization {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long doctorspeacializationid;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor")
    private Doctor doctor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "speacialization")
    private Specialization specialization;
}
