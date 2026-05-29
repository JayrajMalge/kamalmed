package com.kamalmedicare.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "education")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Education {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long educationid;

    @NotBlank
    @Size(max = 20)
    @Column(length = 20)
    private String degree;

    @NotBlank
    @Size(max = 40)
    @Column(length = 40)
    private String universityname;

    private LocalDate fromdate;
    private LocalDate todate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor")
    private Doctor doctor;
}
