package com.applytracker.service;

import com.applytracker.domain.ApplicationStatus;
import com.applytracker.domain.JobApplication;
import com.applytracker.dto.JobApplicationDto;
import com.applytracker.dto.JobApplicationMapper;
import com.applytracker.repository.JobApplicationRepository;
import com.applytracker.web.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class JobApplicationService {

    private final JobApplicationRepository repository;

    @Transactional(readOnly = true)
    public List<JobApplicationDto> findAll(ApplicationStatus status) {
        List<JobApplication> entities = status != null
                ? repository.findByStatusOrderByAppliedDateDesc(status)
                : repository.findAllByOrderByAppliedDateDesc();
        return entities.stream().map(JobApplicationMapper::toDto).toList();
    }

    @Transactional(readOnly = true)
    public JobApplicationDto findById(Long id) {
        return JobApplicationMapper.toDto(getOrThrow(id));
    }

    public JobApplicationDto create(JobApplicationDto dto) {
        JobApplication entity = JobApplicationMapper.toEntity(dto);
        entity.setId(null); // never trust a client-supplied id on create
        JobApplication saved = repository.save(entity);
        return JobApplicationMapper.toDto(saved);
    }

    public JobApplicationDto update(Long id, JobApplicationDto dto) {
        JobApplication entity = getOrThrow(id);
        JobApplicationMapper.copyEditableFields(dto, entity);
        return JobApplicationMapper.toDto(repository.save(entity));
    }

    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new NotFoundException("Başvuru bulunamadı: id=" + id);
        }
        repository.deleteById(id);
    }

    private JobApplication getOrThrow(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new NotFoundException("Başvuru bulunamadı: id=" + id));
    }
}
