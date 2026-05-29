package com.kamalmedicare.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "newsimage")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NewsImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "news")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "newsid")
    private News news;

    @Column(name = "imagepath")
    private String imagepath;

    @Column(name = "imagename", columnDefinition = "mediumtext")
    private String imagename;

    @Column(name = "imagetype", columnDefinition = "mediumtext")
    private String imagetype;
}
