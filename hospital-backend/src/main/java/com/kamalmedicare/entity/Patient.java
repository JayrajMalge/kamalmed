package com.kamalmedicare.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Entity
@Table(name = "patient")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long patientid;

    @NotBlank
    @Size(max = 20)
    @Column(length = 20)
    private String name;

    @Min(0) @Max(150)
    private Integer age;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "enum('Male','Female')")
    private Gender gender;

    @Column(name = "phoneno")
    private Long phoneno;

    @Column(length = 30)
    private String address;

    public enum Gender { Male, Female }
}
