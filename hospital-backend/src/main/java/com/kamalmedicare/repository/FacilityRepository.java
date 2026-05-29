package com.kamalmedicare.repository;

import com.kamalmedicare.entity.Facility;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FacilityRepository extends JpaRepository<Facility, Long> {
    List<Facility> findAllByOrderByFacilitynameAsc();
}
