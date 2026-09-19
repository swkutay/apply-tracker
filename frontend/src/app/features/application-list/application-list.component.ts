import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ApplicationService } from '../../core/application.service';
import { JobApplication, ApplicationStatus, STATUS_LABELS } from '../../core/application-model';

@Component({
  selector: 'app-application-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
  ],
  templateUrl: './application-list.component.html',
  styleUrl: './application-list.component.scss',
})
export class ApplicationListComponent implements OnInit {
  applications: JobApplication[] = [];
  displayedColumns = ['company', 'position', 'platform', 'status', 'appliedDate', 'followUpDate', 'actions'];
  statusLabels = STATUS_LABELS;
  statusOptions = Object.keys(STATUS_LABELS) as ApplicationStatus[];
  selectedStatus: ApplicationStatus | '' = '';
  loading = false;

  statusLabel(status: ApplicationStatus): string {
    return this.statusLabels[status];
  }

  constructor(private service: ApplicationService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.service.getAll(this.selectedStatus || undefined).subscribe({
      next: (apps) => {
        this.applications = apps;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.snackBar.open('Başvurular yüklenirken hata oluştu. Backend çalışıyor mu?', 'Kapat', { duration: 4000 });
      },
    });
  }

  onFilterChange(): void {
    this.load();
  }

  remove(app: JobApplication): void {
    if (!app.id) return;
    if (!confirm(`"${app.company} — ${app.position}" başvurusunu silmek istediğine emin misin?`)) return;
    this.service.delete(app.id).subscribe({
      next: () => {
        this.snackBar.open('Başvuru silindi.', 'Kapat', { duration: 2500 });
        this.load();
      },
      error: () => this.snackBar.open('Silme işlemi başarısız oldu.', 'Kapat', { duration: 3000 }),
    });
  }
}
