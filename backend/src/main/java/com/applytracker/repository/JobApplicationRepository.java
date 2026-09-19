package com.applytracker.repository;

import com.applytracker.domain.ApplicationStatus;
import com.applytracker.domain.JobApplication;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {

    List<JobApplication> findByStatusOrderByAppliedDateDesc(ApplicationStatus status);

    List<JobApplication> findAllByOrderByAppliedDateDesc();
}
