import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface LetterFrequency {
  char: string;
  freq: number;
}

@Component({
  selector: 'app-word-distribution-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="chart-container">
      <!-- Chart implementation will go here -->
      <pre>{{ letterFrequencies | json }}</pre>
    </div>
  `
})
export class WordDistributionChartComponent {
  @Input() letterFrequencies!: LetterFrequency[];
}
