package com.kamalmedicare.repository;

import com.kamalmedicare.entity.Treatment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TreatmentRepository extends JpaRepository<Treatment, Long> {
    List<Treatment> findAllByOrderByTitleAsc();
}
