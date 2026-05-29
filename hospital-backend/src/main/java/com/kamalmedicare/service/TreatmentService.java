package com.kamalmedicare.service;

import com.kamalmedicare.entity.Treatment;
import com.kamalmedicare.repository.TreatmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TreatmentService {

    private final TreatmentRepository treatmentRepo;

    public List<Treatment> findAll() { return treatmentRepo.findAllByOrderByTitleAsc(); }

    public Treatment findById(Long id) {
        return treatmentRepo.findById(id).orElseThrow(() -> new RuntimeException("Treatment not found"));
    }

    public Treatment create(Treatment t) { return treatmentRepo.save(t); }

    public Treatment update(Long id, Treatment data) {
        Treatment t = findById(id);
        if (data.getTitle() != null) t.setTitle(data.getTitle());
        if (data.getDescription() != null) t.setDescription(data.getDescription());
        if (data.getCost() != null) t.setCost(data.getCost());
        return treatmentRepo.save(t);
    }

    public void delete(Long id) { treatmentRepo.deleteById(id); }
}
