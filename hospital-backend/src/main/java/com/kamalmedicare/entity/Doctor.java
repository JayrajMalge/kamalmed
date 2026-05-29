package com.kamalmedicare.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "doctor")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long doctorid;

    @NotBlank
    @Size(max = 50)
    @Column(length = 50)
    private String name;

    @Email
    @Column(length = 50)
    private String email;

    @Pattern(regexp = "^[0-9]{10,12}$")
    @Column(length = 12)
    private String phone;

    @Column(name = "schedulefrom", length = 10)
    private String schedulefrom;

    @Column(name = "scheduleto", length = 10)
    private String scheduleto;

    @Column(name = "joindate")
    private LocalDate joindate;

    @Column(name = "resigndate")
    private LocalDate resigndate;

    @Column(name = "profilephotopath")
    private String profilephotopath;

    @Column(name = "imagename", columnDefinition = "mediumtext")
    private String imagename;

    @Column(name = "imagetype", columnDefinition = "mediumtext")
    private String imagetype;

    @Column(name = "doctor", columnDefinition = "mediumtext")
    private String doctor;

    @Column(name = "about", columnDefinition = "mediumtext")
    private String about;

    @OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Education> educations;

    @OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Experience> experiences;

    @OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DoctorSpecialization> specializations;
}
