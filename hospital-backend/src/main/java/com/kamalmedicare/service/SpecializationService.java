package com.kamalmedicare.service;

import com.kamalmedicare.entity.*;
import com.kamalmedicare.repository.*;
import com.kamalmedicare.util.FileStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SpecializationService {

    private final SpecializationRepository specializationRepo;
    private final SubSpecializationRepository subSpecRepo;
    private final FileStorageService fileStorage;

    public List<Specialization> findAll() {
        return specializationRepo.findAllByOrderByFieldnameAsc();
    }

    public Specialization findById(Long id) {
        return specializationRepo.findById(id)
            .orElseThrow(() -> new RuntimeException("Specialization not found"));
    }

    public Specialization create(String fieldname, String description, MultipartFile image) throws IOException {
        Specialization spec = Specialization.builder()
            .fieldname(fieldname).description(description).build();
        if (image != null && !image.isEmpty()) {
            spec.setImagepath(fileStorage.store(image, "specializations"));
        }
        return specializationRepo.save(spec);
    }

    public Specialization update(Long id, String fieldname, String description, MultipartFile image) throws IOException {
        Specialization spec = findById(id);
        if (fieldname != null) spec.setFieldname(fieldname);
        if (description != null) spec.setDescription(description);
        if (image != null && !image.isEmpty()) {
            fileStorage.delete(spec.getImagepath());
            spec.setImagepath(fileStorage.store(image, "specializations"));
        }
        return specializationRepo.save(spec);
    }

    public void delete(Long id) {
        Specialization spec = findById(id);
        fileStorage.delete(spec.getImagepath());
        specializationRepo.delete(spec);
    }

    public SubSpecialization addSubSpec(Long specId, String name, String description, MultipartFile image) throws IOException {
        Specialization spec = findById(specId);
        SubSpecialization sub = SubSpecialization.builder()
            .name(name).description(description).specialization(spec).build();
        sub = subSpecRepo.save(sub);
        if (image != null && !image.isEmpty()) {
            SubSpecializationImage img = SubSpecializationImage.builder()
                .subSpecialization(sub)
                .imagepath(fileStorage.store(image, "subspecializations"))
                .imagename(image.getOriginalFilename())
                .imagetype(image.getContentType())
                .build();
            sub.setImages(List.of(img));
        }
        return subSpecRepo.save(sub);
    }

    public List<SubSpecialization> getSubSpecs(Long specId) {
        return subSpecRepo.findBySpecializationSpeacializationid(specId);
    }
}
