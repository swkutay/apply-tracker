package com.applytracker.dto;

import com.applytracker.domain.ApplicationStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobApplicationDto {

    private Long id;

    @NotBlank(message = "Şirket alanı zorunludur")
    private String company;

    @NotBlank(message = "Pozisyon alanı zorunludur")
    private String position;

    private String platform;

    private String jobUrl;

    private String cvVersion;

    @NotNull(message = "Durum alanı zorunludur")
    private ApplicationStatus status;

    @NotNull(message = "Başvuru tarihi zorunludur")
    private LocalDate appliedDate;

    private LocalDate followUpDate;

    private String notes;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
