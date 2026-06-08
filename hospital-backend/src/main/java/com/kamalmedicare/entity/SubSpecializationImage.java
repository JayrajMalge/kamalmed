package com.kamalmedicare.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "subspeacializationimagesvideo")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SubSpecializationImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long subspeacializationimagesid;

    @JsonBackReference("subspecialization-images")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subspeacialization")
    private SubSpecialization subSpecialization;

    @Column(name = "imagepath")
    private String imagepath;

    @Column(name = "imagename", columnDefinition = "mediumtext")
    private String imagename;

    @Column(name = "imagetype")
    private String imagetype;
}
