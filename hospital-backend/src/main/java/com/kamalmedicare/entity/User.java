package com.kamalmedicare.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "user")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userid;

    @Column(unique = true, nullable = false, length = 30)
    @NotBlank
    @Size(max = 30)
    private String username;

    @Column(length = 100)
    private String hashedpassword;

    @Column(length = 30)
    @Email
    private String email;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "enum('Admin','Visitor')")
    private Role role;

    @Column(name = "createat")
    private LocalDateTime createat = LocalDateTime.now();

    @Column(name = "updateat")
    private LocalDateTime updateat = LocalDateTime.now();

    @Column(name = "oauth_provider", length = 20)
    private String oauthProvider;

    @Column(name = "oauth_id", length = 100)
    private String oauthId;

    public enum Role {
        Admin, Visitor
    }
}
