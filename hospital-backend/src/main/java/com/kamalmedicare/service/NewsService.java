package com.kamalmedicare.service;

import com.kamalmedicare.entity.*;
import com.kamalmedicare.repository.NewsRepository;
import com.kamalmedicare.util.FileStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NewsService {

    private final NewsRepository newsRepo;
    private final FileStorageService fileStorage;

    public List<News> findAll() { return newsRepo.findAllByOrderByNewsdateDesc(); }

    public List<News> findByType(String type) { return newsRepo.findByNewstype(type); }

    public News findById(Long id) {
        return newsRepo.findById(id).orElseThrow(() -> new RuntimeException("News not found"));
    }

    public News create(String title, String description, String type, List<MultipartFile> images) throws IOException {
        News n = News.builder().title(title).description(description).newstype(type).build();
        n = newsRepo.save(n);
        if (images != null) {
            for (MultipartFile img : images) {
                if (!img.isEmpty()) {
                    NewsImage ni = NewsImage.builder()
                        .imagepath(fileStorage.store(img, "news"))
                        .imagename(img.getOriginalFilename())
                        .imagetype(img.getContentType())
                        .news(n).build();
                    n.getImages().add(ni);
                }
            }
        }
        return newsRepo.save(n);
    }

    public News update(Long id, String title, String description, String type, List<MultipartFile> images) throws IOException {
        News n = findById(id);
        if (title != null) n.setTitle(title);
        if (description != null) n.setDescription(description);
        if (type != null) n.setNewstype(type);
        if (images != null) {
            for (MultipartFile img : images) {
                if (!img.isEmpty()) {
                    NewsImage ni = NewsImage.builder()
                        .imagepath(fileStorage.store(img, "news"))
                        .imagename(img.getOriginalFilename())
                        .imagetype(img.getContentType())
                        .news(n).build();
                    n.getImages().add(ni);
                }
            }
        }
        return newsRepo.save(n);
    }

    public void delete(Long id) {
        News n = findById(id);
        if (n.getImages() != null) n.getImages().forEach(i -> fileStorage.delete(i.getImagepath()));
        newsRepo.delete(n);
    }
}
