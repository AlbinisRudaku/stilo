import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface StructuralData {
  avg_paragraph_length: number;
  paragraph_length_variance: number;
  paragraph_count: number;
  text_density: number;
  whitespace_ratio: number;
  line_break_frequency: number;
  sentence_length_variance: number;
  avg_sentences_per_paragraph: number;
  structure_consistency: number;
}

@Component({
  selector: 'app-structural-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="chart-container">
      <!-- Chart implementation will go here -->
      <pre>{{ structuralData | json }}</pre>
    </div>
  `
})
export class StructuralChartComponent {
  @Input() structuralData!: StructuralData;
}
