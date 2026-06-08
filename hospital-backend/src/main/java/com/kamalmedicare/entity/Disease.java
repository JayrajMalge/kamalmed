package com.kamalmedicare.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "disease")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Disease {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long diseaseid;

    @NotBlank
    @Size(max = 40)
    @Column(length = 40)
    private String name;

    @Column(columnDefinition = "mediumtext")
    private String description;

    @JsonManagedReference("disease-images")
    @Builder.Default
    @OneToMany(mappedBy = "disease", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DiseaseImage> images = new ArrayList<>();
}
