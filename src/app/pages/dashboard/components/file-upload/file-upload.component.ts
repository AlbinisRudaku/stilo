import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AnalysisService } from '../../../../services/analysis.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  isDragging = false;
  selectedFile: File | null = null;
  uploadProgress = 0;
  isUploading = false;
  errorMessage: string | null = null;

  constructor(
    private router: Router,
    private analysisService: AnalysisService
  ) {}

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;

    const files = event.dataTransfer?.files;
    if (files?.length) {
      this.handleFile(files[0]);
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.handleFile(input.files[0]);
    }
  }

  private handleFile(file: File) {
    if (file.type !== 'application/pdf') {
      this.errorMessage = 'Please upload a PDF file';
      return;
    }

    this.selectedFile = file;
    this.errorMessage = null;
    this.isUploading = true;
    this.uploadProgress = 0;

    this.analysisService.analyzeDocument(file)
      .pipe(
        finalize(() => {
          this.isUploading = false;
        })
      )
      .subscribe({
        next: (response) => {
          this.uploadProgress = response.progress;
          if (response.data) {
            // Store the analysis data in a service or state management
            localStorage.setItem('analysisData', JSON.stringify(response.data));
            this.router.navigate(['/analysis']);
          }
        },
        error: (error) => {
          this.errorMessage = 'Error analyzing document. Please try again.';
          console.error('Upload error:', error);
        }
      });
  }
}
