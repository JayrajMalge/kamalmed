package com.kamalmedicare.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "treatment")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Treatment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long treatmentid;

    @NotBlank
    @Size(max = 100)
    @Column(length = 100)
    private String title;

    @Column(columnDefinition = "mediumtext")
    private String description;

    private Integer cost;

    @Column(name = "tratmentdate")
    private LocalDateTime tratmentdate = LocalDateTime.now();
}
