export type ApplicationStatus =
  | 'APPLIED'
  | 'REVIEWING'
  | 'INTERVIEW_PENDING'
  | 'INTERVIEWED'
  | 'OFFER'
  | 'REJECTED'
  | 'WITHDRAWN';

export const STATUS_LABELS: Record<ApplicationStatus, string> = {
  APPLIED: 'Başvuruldu',
  REVIEWING: 'İnceleniyor',
  INTERVIEW_PENDING: 'Mülakat Bekleniyor',
  INTERVIEWED: 'Mülakat Yapıldı',
  OFFER: 'Teklif',
  REJECTED: 'Reddedildi',
  WITHDRAWN: 'Vazgeçildi',
};

export interface JobApplication {
  id?: number;
  company: string;
  position: string;
  platform?: string;
  jobUrl?: string;
  cvVersion?: string;
  status: ApplicationStatus;
  appliedDate: string; // ISO date (yyyy-MM-dd)
  followUpDate?: string | null;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}
