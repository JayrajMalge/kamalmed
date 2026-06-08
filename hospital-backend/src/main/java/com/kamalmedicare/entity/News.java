package com.kamalmedicare.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "news")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class News {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long newsid;

    @NotBlank
    @Size(max = 200)
    @Column(length = 200)
    private String title;

    @Column(columnDefinition = "mediumtext")
    private String description;

    @Column(name = "newsdate")
    private LocalDateTime newsdate = LocalDateTime.now();

    @Column(name = "newstype", length = 30)
    private String newstype;

    @JsonManagedReference("news-images")
    @Builder.Default
    @OneToMany(mappedBy = "news", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<NewsImage> images = new ArrayList<>();
}
