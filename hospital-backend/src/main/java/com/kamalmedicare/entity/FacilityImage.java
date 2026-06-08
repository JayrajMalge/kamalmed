package com.kamalmedicare.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "facilites_images")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FacilityImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long imgid;

    @Column(name = "imagepath")
    private String imagepath;

    @JsonBackReference("facility-images")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "facility")
    private Facility facility;

    @Column(name = "imagename", columnDefinition = "mediumtext")
    private String imagename;

    @Column(name = "imagetype", columnDefinition = "mediumtext")
    private String imagetype;
}
