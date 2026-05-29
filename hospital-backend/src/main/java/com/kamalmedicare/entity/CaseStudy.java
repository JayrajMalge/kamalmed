package com.kamalmedicare.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "casestudies")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class CaseStudy {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long casestudyid;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "treatmentid")
    private Treatment treatment;

    @Column(columnDefinition = "mediumtext") private String title;
    @Column(columnDefinition = "mediumtext") private String description;
    @Column(columnDefinition = "mediumtext") private String result;
    private LocalDateTime dateofcase = LocalDateTime.now();

    @OneToMany(mappedBy = "caseStudy", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CaseStudyImage> images;
}
