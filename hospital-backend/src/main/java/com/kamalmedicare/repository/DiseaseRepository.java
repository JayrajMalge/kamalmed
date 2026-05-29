package com.kamalmedicare.repository;

import com.kamalmedicare.entity.Disease;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DiseaseRepository extends JpaRepository<Disease, Long> {
    List<Disease> findAllByOrderByNameAsc();
}
