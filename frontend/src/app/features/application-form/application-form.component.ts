import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ApplicationService } from '../../core/application.service';
import { ApplicationStatus, JobApplication, STATUS_LABELS } from '../../core/application-model';

@Component({
  selector: 'app-application-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './application-form.component.html',
  styleUrl: './application-form.component.scss',
})
export class ApplicationFormComponent implements OnInit {
  form: FormGroup;
  statusLabels = STATUS_LABELS;
  statusOptions = Object.keys(STATUS_LABELS) as ApplicationStatus[];
  editingId: number | null = null;
  isEdit = false;

  statusLabel(status: ApplicationStatus): string {
    return this.statusLabels[status];
  }

  constructor(
    private fb: FormBuilder,
    private service: ApplicationService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      company: ['', Validators.required],
      position: ['', Validators.required],
      platform: [''],
      jobUrl: [''],
      cvVersion: [''],
      status: ['APPLIED', Validators.required],
      appliedDate: [new Date(), Validators.required],
      followUpDate: [null],
      notes: [''],
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.editingId = Number(idParam);
      this.isEdit = true;
      this.service.getById(this.editingId).subscribe((app) => {
        this.form.patchValue({
          ...app,
          appliedDate: app.appliedDate ? new Date(app.appliedDate) : null,
          followUpDate: app.followUpDate ? new Date(app.followUpDate) : null,
        });
      });
    }
  }

  private toIsoDate(value: Date | string | null): string | null {
    if (!value) return null;
    const d = value instanceof Date ? value : new Date(value);
    return d.toISOString().slice(0, 10);
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const raw = this.form.value;
    const payload: JobApplication = {
      ...raw,
      appliedDate: this.toIsoDate(raw.appliedDate)!,
      followUpDate: this.toIsoDate(raw.followUpDate),
    };

    const request$ = this.isEdit && this.editingId
      ? this.service.update(this.editingId, payload)
      : this.service.create(payload);

    request$.subscribe({
      next: () => {
        this.snackBar.open(this.isEdit ? 'Başvuru güncellendi.' : 'Başvuru eklendi.', 'Kapat', { duration: 2500 });
        this.router.navigate(['/applications']);
      },
      error: () => this.snackBar.open('Kaydedilirken hata oluştu.', 'Kapat', { duration: 3000 }),
    });
  }

  cancel(): void {
    this.router.navigate(['/applications']);
  }
}
