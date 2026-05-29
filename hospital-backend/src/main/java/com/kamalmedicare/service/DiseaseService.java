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
public class DiseaseService {

    private final DiseaseRepository diseaseRepo;
    private final FileStorageService fileStorage;

    public List<Disease> findAll() { return diseaseRepo.findAllByOrderByNameAsc(); }

    public Disease findById(Long id) {
        return diseaseRepo.findById(id).orElseThrow(() -> new RuntimeException("Disease not found"));
    }

    public Disease create(String name, String description, List<MultipartFile> images) throws IOException {
        Disease d = Disease.builder().name(name).description(description).build();
        d = diseaseRepo.save(d);
        if (images != null) {
            for (MultipartFile img : images) {
                if (!img.isEmpty()) {
                    DiseaseImage di = DiseaseImage.builder()
                        .imagepath(fileStorage.store(img, "diseases"))
                        .imagename(img.getOriginalFilename())
                        .imagetype(img.getContentType())
                        .disease(d).build();
                    d.getImages().add(di);
                }
            }
        }
        return diseaseRepo.save(d);
    }

    public Disease update(Long id, String name, String description, List<MultipartFile> images) throws IOException {
        Disease d = findById(id);
        if (name != null) d.setName(name);
        if (description != null) d.setDescription(description);
        if (images != null) {
            for (MultipartFile img : images) {
                if (!img.isEmpty()) {
                    DiseaseImage di = DiseaseImage.builder()
                        .imagepath(fileStorage.store(img, "diseases"))
                        .imagename(img.getOriginalFilename())
                        .imagetype(img.getContentType())
                        .disease(d).build();
                    d.getImages().add(di);
                }
            }
        }
        return diseaseRepo.save(d);
    }

    public void delete(Long id) {
        Disease d = findById(id);
        if (d.getImages() != null) d.getImages().forEach(i -> fileStorage.delete(i.getImagepath()));
        diseaseRepo.delete(d);
    }
}
