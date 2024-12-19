import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AnalysisComponent } from './pages/analysis/analysis.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'analysis', component: AnalysisComponent },
  { path: '**', redirectTo: '' }
];
