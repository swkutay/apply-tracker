import { Routes } from '@angular/router';
import { ApplicationListComponent } from './features/application-list/application-list.component';
import { ApplicationFormComponent } from './features/application-form/application-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'applications', pathMatch: 'full' },
  { path: 'applications', component: ApplicationListComponent },
  { path: 'applications/new', component: ApplicationFormComponent },
  { path: 'applications/:id/edit', component: ApplicationFormComponent },
  { path: '**', redirectTo: 'applications' },
];
