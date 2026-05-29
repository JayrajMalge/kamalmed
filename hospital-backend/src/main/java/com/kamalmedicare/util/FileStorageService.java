package com.kamalmedicare.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.*;
import java.util.UUID;

@Service
public class FileStorageService {

    @Value("${file.upload-dir}")
    private String uploadDir;

    public String store(MultipartFile file, String subfolder) throws IOException {
        Path dir = Paths.get(uploadDir, subfolder).toAbsolutePath().normalize();
        Files.createDirectories(dir);
        String ext = getExtension(file.getOriginalFilename());
        String filename = UUID.randomUUID() + "." + ext;
        Path target = dir.resolve(filename);
        Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);
        return subfolder + "/" + filename;
    }

    public void delete(String relativePath) {
        if (relativePath == null) return;
        try {
            Path file = Paths.get(uploadDir, relativePath).toAbsolutePath().normalize();
            Files.deleteIfExists(file);
        } catch (IOException ignored) {}
    }

    private String getExtension(String filename) {
        if (filename == null) return "jpg";
        int dot = filename.lastIndexOf('.');
        return dot >= 0 ? filename.substring(dot + 1).toLowerCase() : "jpg";
    }

    public String getUploadDir() { return uploadDir; }
}
