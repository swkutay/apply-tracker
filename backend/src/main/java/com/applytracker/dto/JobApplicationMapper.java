package com.applytracker.dto;

import com.applytracker.domain.JobApplication;

public final class JobApplicationMapper {

    private JobApplicationMapper() {
    }

    public static JobApplicationDto toDto(JobApplication entity) {
        return JobApplicationDto.builder()
                .id(entity.getId())
                .company(entity.getCompany())
                .position(entity.getPosition())
                .platform(entity.getPlatform())
                .jobUrl(entity.getJobUrl())
                .cvVersion(entity.getCvVersion())
                .status(entity.getStatus())
                .appliedDate(entity.getAppliedDate())
                .followUpDate(entity.getFollowUpDate())
                .notes(entity.getNotes())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }

    public static JobApplication toEntity(JobApplicationDto dto) {
        return JobApplication.builder()
                .id(dto.getId())
                .company(dto.getCompany())
                .position(dto.getPosition())
                .platform(dto.getPlatform())
                .jobUrl(dto.getJobUrl())
                .cvVersion(dto.getCvVersion())
                .status(dto.getStatus())
                .appliedDate(dto.getAppliedDate())
                .followUpDate(dto.getFollowUpDate())
                .notes(dto.getNotes())
                .build();
    }

    /** Applies editable fields from {@code dto} onto an already-persisted {@code entity}. */
    public static void copyEditableFields(JobApplicationDto dto, JobApplication entity) {
        entity.setCompany(dto.getCompany());
        entity.setPosition(dto.getPosition());
        entity.setPlatform(dto.getPlatform());
        entity.setJobUrl(dto.getJobUrl());
        entity.setCvVersion(dto.getCvVersion());
        entity.setStatus(dto.getStatus());
        entity.setAppliedDate(dto.getAppliedDate());
        entity.setFollowUpDate(dto.getFollowUpDate());
        entity.setNotes(dto.getNotes());
    }
}
