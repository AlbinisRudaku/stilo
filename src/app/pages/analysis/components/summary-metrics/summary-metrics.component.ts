import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface MetricItem {
  score: number;
  interpretation: string;
}

interface SummaryMetrics {
  [key: string]: MetricItem;
  readability: MetricItem;
  vocabulary: MetricItem;
  structure: MetricItem;
}

@Component({
  selector: 'app-summary-metrics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './summary-metrics.component.html',
  styleUrls: ['./summary-metrics.component.scss']
})
export class SummaryMetricsComponent {
  @Input() metrics!: SummaryMetrics;
  readonly metricKeys = ['readability', 'vocabulary', 'structure'] as const;

  getScoreColor(score: number): string {
    if (score >= 0.7) return '#4CAF50';
    if (score >= 0.4) return '#FFC107';
    return '#FF5252';
  }
}
