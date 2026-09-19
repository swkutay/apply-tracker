package com.applytracker.web;

import com.applytracker.domain.ApplicationStatus;
import com.applytracker.dto.JobApplicationDto;
import com.applytracker.service.JobApplicationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@RequiredArgsConstructor
public class JobApplicationController {

    private final JobApplicationService service;

    @GetMapping
    public List<JobApplicationDto> findAll(@RequestParam(required = false) ApplicationStatus status) {
        return service.findAll(status);
    }

    @GetMapping("/{id}")
    public JobApplicationDto findById(@PathVariable Long id) {
        return service.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public JobApplicationDto create(@Valid @RequestBody JobApplicationDto dto) {
        return service.create(dto);
    }

    @PutMapping("/{id}")
    public JobApplicationDto update(@PathVariable Long id, @Valid @RequestBody JobApplicationDto dto) {
        return service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
