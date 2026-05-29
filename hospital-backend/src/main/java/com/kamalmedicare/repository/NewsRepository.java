package com.kamalmedicare.repository;

import com.kamalmedicare.entity.News;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface NewsRepository extends JpaRepository<News, Long> {
    List<News> findAllByOrderByNewsdateDesc();
    List<News> findByNewstype(String newstype);
}
