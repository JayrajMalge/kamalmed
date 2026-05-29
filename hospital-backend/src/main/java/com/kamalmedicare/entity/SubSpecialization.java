package com.kamalmedicare.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "subspeacialization")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SubSpecialization {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long subspeacializationid;

    @NotBlank
    @Size(max = 50)
    @Column(length = 50)
    private String name;

    @Column(columnDefinition = "mediumtext")
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "speacialization")
    private Specialization specialization;

    @OneToMany(mappedBy = "subSpecialization", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SubSpecializationImage> images;
}
