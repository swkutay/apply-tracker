package com.applytracker.domain;

/**
 * Mirrors the status options in the Angular frontend and the earlier Excel tracker
 * (Başvuruldu / İnceleniyor / Mülakat Bekleniyor / Mülakat Yapıldı / Teklif / Reddedildi / Vazgeçildi).
 */
public enum ApplicationStatus {
    APPLIED,
    REVIEWING,
    INTERVIEW_PENDING,
    INTERVIEWED,
    OFFER,
    REJECTED,
    WITHDRAWN
}
