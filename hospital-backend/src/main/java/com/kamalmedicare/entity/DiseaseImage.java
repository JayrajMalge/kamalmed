package com.kamalmedicare.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "diseaseimages")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DiseaseImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long diseaseimageid;

    @Column(name = "imagepath")
    private String imagepath;

    @Column(name = "imagename", columnDefinition = "mediumtext")
    private String imagename;

    @Column(name = "imagetype", length = 12)
    private String imagetype;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "disease")
    private Disease disease;
}
