import { Component, Input, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Chart } from 'chart.js/auto';

interface ComplexityData {
  score: number;
  level: string;
  components: {
    vocabulary_contribution: number;
    syntax_contribution: number;
    readability_contribution: number;
  };
}

@Component({
  selector: 'app-complexity-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './complexity-chart.component.html',
  styleUrls: ['./complexity-chart.component.scss']
})
export class ComplexityChartComponent implements OnInit {
  @Input() complexityData!: ComplexityData;
  private chart: Chart | undefined;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.createComplexityChart();
      }, 0);
    }
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  private createComplexityChart() {
    const ctx = document.getElementById('complexityChart') as HTMLCanvasElement;
    if (!ctx) return;

    this.chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Vocabulary', 'Syntax', 'Readability'],
        datasets: [{
          data: [
            this.complexityData.components.vocabulary_contribution,
            this.complexityData.components.syntax_contribution,
            this.complexityData.components.readability_contribution
          ],
          backgroundColor: [
            '#00f2fe',
            '#4facfe',
            '#2E3192'
          ]
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#ffffff'
            }
          }
        }
      }
    });
  }
}
