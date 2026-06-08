package com.kamalmedicare.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "experience")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Experience {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long experienceid;

    @NotBlank
    @Size(max = 40)
    @Column(length = 40)
    private String field;

    @NotBlank
    @Size(max = 40)
    @Column(length = 40)
    private String hospitalname;

    private Integer years;
    private LocalDate fromdate;
    private LocalDate todate;

    @JsonBackReference("doctor-experiences")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor")
    private Doctor doctor;
}
