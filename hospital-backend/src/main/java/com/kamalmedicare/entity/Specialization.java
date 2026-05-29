package com.kamalmedicare.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "speacialization")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Specialization {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long speacializationid;

    @NotBlank
    @Size(max = 50)
    @Column(length = 50)
    private String fieldname;

    @Column(columnDefinition = "mediumtext")
    private String description;

    @Column(name = "imagepath")
    private String imagepath;

    @OneToMany(mappedBy = "specialization", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SubSpecialization> subSpecializations;
}
