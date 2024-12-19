import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {
  private apiUrl = 'http://127.0.0.1:8080/api/analyze';

  constructor(private http: HttpClient) {}

  analyzeDocument(file: File): Observable<{ progress: number; data?: any }> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(this.apiUrl, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      map((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            const progress = event.total ? Math.round(100 * event.loaded / event.total) : 0;
            return { progress };
          case HttpEventType.Response:
            return { progress: 100, data: event.body };
          default:
            return { progress: 0 };
        }
      })
    );
  }
}
