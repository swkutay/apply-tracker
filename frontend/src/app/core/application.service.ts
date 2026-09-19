import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { JobApplication } from './application-model';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  private readonly baseUrl = `${environment.apiUrl}/applications`;

  constructor(private http: HttpClient) {}

  getAll(status?: string): Observable<JobApplication[]> {
    let params = new HttpParams();
    if (status) {
      params = params.set('status', status);
    }
    return this.http.get<JobApplication[]>(this.baseUrl, { params });
  }

  getById(id: number): Observable<JobApplication> {
    return this.http.get<JobApplication>(`${this.baseUrl}/${id}`);
  }

  create(app: JobApplication): Observable<JobApplication> {
    return this.http.post<JobApplication>(this.baseUrl, app);
  }

  update(id: number, app: JobApplication): Observable<JobApplication> {
    return this.http.put<JobApplication>(`${this.baseUrl}/${id}`, app);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
