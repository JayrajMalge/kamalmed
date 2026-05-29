package com.kamalmedicare.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "facilites")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Facility {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long facilitesid;

    @NotBlank
    @Size(max = 30)
    @Column(length = 30)
    private String facilityname;

    @Column(columnDefinition = "mediumtext")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "enum('yes','no')")
    private Availability availability;

    @Column(length = 30)
    private String facilitytype;

    @OneToMany(mappedBy = "facility", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<FacilityImage> images;

    public enum Availability {
        yes, no
    }
}
