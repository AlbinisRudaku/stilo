import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './components/file-upload/file-upload.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FileUploadComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  title = 'Stilo Analysis';
}
