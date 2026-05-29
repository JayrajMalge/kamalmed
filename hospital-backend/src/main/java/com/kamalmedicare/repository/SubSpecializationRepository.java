package com.kamalmedicare.repository;

import com.kamalmedicare.entity.SubSpecialization;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SubSpecializationRepository extends JpaRepository<SubSpecialization, Long> {
    List<SubSpecialization> findBySpecializationSpeacializationid(Long specializationId);
}
