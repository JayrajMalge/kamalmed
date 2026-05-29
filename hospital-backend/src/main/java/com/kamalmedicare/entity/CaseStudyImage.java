package com.kamalmedicare.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity @Table(name = "casestudies_images")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class CaseStudyImage {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long imgid;
    @Column(name = "imagepath") private String imagepath;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "casestudy") private CaseStudy caseStudy;
    @Column(name = "imagename", columnDefinition = "mediumtext") private String imagename;
    @Column(name = "imagetype", columnDefinition = "mediumtext") private String imagetype;
}
