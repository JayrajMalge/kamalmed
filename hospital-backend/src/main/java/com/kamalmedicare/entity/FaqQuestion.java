package com.kamalmedicare.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity @Table(name = "faquestion")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class FaqQuestion {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long faquestionid;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "user") private User user;
    @Size(max = 60) @Column(length = 60) private String question;
    @Size(max = 80) @Column(length = 80) private String answer;
    private LocalDateTime creatat = LocalDateTime.now();
    private LocalDateTime answerat;
}
