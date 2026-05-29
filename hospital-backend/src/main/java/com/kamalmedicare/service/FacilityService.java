package com.kamalmedicare.service;

import com.kamalmedicare.entity.*;
import com.kamalmedicare.repository.FacilityRepository;
import com.kamalmedicare.util.FileStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FacilityService {

    private final FacilityRepository facilityRepo;
    private final FileStorageService fileStorage;

    public List<Facility> findAll() { return facilityRepo.findAllByOrderByFacilitynameAsc(); }

    public Facility findById(Long id) {
        return facilityRepo.findById(id).orElseThrow(() -> new RuntimeException("Facility not found"));
    }

    public Facility create(String name, String description, String type, String availability, List<MultipartFile> images) throws IOException {
        Facility f = Facility.builder()
            .facilityname(name).description(description).facilitytype(type)
            .availability(Facility.Availability.valueOf(availability)).build();
        f = facilityRepo.save(f);
        if (images != null) {
            for (MultipartFile img : images) {
                if (!img.isEmpty()) {
                    FacilityImage fi = FacilityImage.builder()
                        .imagepath(fileStorage.store(img, "facilities"))
                        .imagename(img.getOriginalFilename())
                        .imagetype(img.getContentType())
                        .facility(f).build();
                    f.getImages().add(fi);
                }
            }
        }
        return facilityRepo.save(f);
    }

    public Facility update(Long id, String name, String description, String type, String availability, List<MultipartFile> images) throws IOException {
        Facility f = findById(id);
        if (name != null) f.setFacilityname(name);
        if (description != null) f.setDescription(description);
        if (type != null) f.setFacilitytype(type);
        if (availability != null) f.setAvailability(Facility.Availability.valueOf(availability));
        if (images != null) {
            for (MultipartFile img : images) {
                if (!img.isEmpty()) {
                    FacilityImage fi = FacilityImage.builder()
                        .imagepath(fileStorage.store(img, "facilities"))
                        .imagename(img.getOriginalFilename())
                        .imagetype(img.getContentType())
                        .facility(f).build();
                    f.getImages().add(fi);
                }
            }
        }
        return facilityRepo.save(f);
    }

    public void delete(Long id) {
        Facility f = findById(id);
        if (f.getImages() != null) f.getImages().forEach(i -> fileStorage.delete(i.getImagepath()));
        facilityRepo.delete(f);
    }
}
