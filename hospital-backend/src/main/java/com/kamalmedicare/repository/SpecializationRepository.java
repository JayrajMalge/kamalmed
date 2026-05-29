package com.kamalmedicare.repository;

import com.kamalmedicare.entity.Specialization;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SpecializationRepository extends JpaRepository<Specialization, Long> {
    List<Specialization> findAllByOrderByFieldnameAsc();
}
