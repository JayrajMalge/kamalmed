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
public class DoctorService {

    private final DoctorRepository doctorRepo;
    private final SpecializationRepository specRepo;
    private final FileStorageService fileStorage;

    public List<Doctor> findAll() { return doctorRepo.findAllByOrderByNameAsc(); }

    public Doctor findById(Long id) {
        return doctorRepo.findById(id).orElseThrow(() -> new RuntimeException("Doctor not found"));
    }

    public Doctor create(Doctor data, MultipartFile photo, List<Long> specIds) throws IOException {
        if (photo != null && !photo.isEmpty()) {
            data.setProfilephotopath(fileStorage.store(photo, "doctors"));
            data.setImagename(photo.getOriginalFilename());
            data.setImagetype(photo.getContentType());
        }
        Doctor saved = doctorRepo.save(data);
        if (specIds != null) {
            for (Long sid : specIds) {
                specRepo.findById(sid).ifPresent(spec -> {
                    DoctorSpecialization ds = DoctorSpecialization.builder()
                        .doctor(saved).specialization(spec).build();
                    saved.getSpecializations().add(ds);
                });
            }
            doctorRepo.save(saved);
        }
        return saved;
    }

    public Doctor update(Long id, Doctor data, MultipartFile photo) throws IOException {
        Doctor d = findById(id);
        if (data.getName() != null) d.setName(data.getName());
        if (data.getEmail() != null) d.setEmail(data.getEmail());
        if (data.getPhone() != null) d.setPhone(data.getPhone());
        if (data.getAbout() != null) d.setAbout(data.getAbout());
        if (data.getSchedulefrom() != null) d.setSchedulefrom(data.getSchedulefrom());
        if (data.getScheduleto() != null) d.setScheduleto(data.getScheduleto());
        if (photo != null && !photo.isEmpty()) {
            fileStorage.delete(d.getProfilephotopath());
            d.setProfilephotopath(fileStorage.store(photo, "doctors"));
            d.setImagename(photo.getOriginalFilename());
            d.setImagetype(photo.getContentType());
        }
        return doctorRepo.save(d);
    }

    public void delete(Long id) {
        Doctor d = findById(id);
        fileStorage.delete(d.getProfilephotopath());
        doctorRepo.delete(d);
    }
}
