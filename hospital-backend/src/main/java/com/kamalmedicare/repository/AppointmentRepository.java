package com.kamalmedicare.repository;

import com.kamalmedicare.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findAllByOrderByAppointmentdateDesc();
    List<Appointment> findByDoctorDoctorid(Long doctorId);
    List<Appointment> findByUserUserid(Long userId);
}
