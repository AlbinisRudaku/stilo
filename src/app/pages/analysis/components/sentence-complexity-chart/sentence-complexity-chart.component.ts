import { Component, Input, OnInit, PLATFORM_ID, Inject, ViewChild, ElementRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-sentence-complexity-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="chart-wrapper">
      <canvas #chartCanvas></canvas>
    </div>
  `,
  styles: [`
    .chart-wrapper {
      width: 100%;
      height: 300px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
    }
    canvas {
      width: 100% !important;
      height: 100% !important;
    }
  `]
})
export class SentenceComplexityChartComponent implements OnInit {
  @Input() complexity!: number;
  @Input() avgLength!: number;
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  private chart: Chart | undefined;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => this.createChart(), 0);
    }
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  private createChart() {
    if (!this.chartCanvas) return;

    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: 'radar',
      data: {
        labels: ['Complexity', 'Length', 'Readability'],
        datasets: [{
          data: [
            this.complexity * 100,
            (this.avgLength / 30) * 100, // Normalize to percentage
            100 - (this.complexity * 100) // Inverse of complexity
          ],
          backgroundColor: 'rgba(0, 245, 160, 0.2)',
          borderColor: '#00F5A0',
          pointBackgroundColor: '#00F5A0'
        }]
      },
      options: {
        scales: {
          r: {
            grid: { color: 'rgba(255, 255, 255, 0.1)' },
            pointLabels: { color: '#ffffff' },
            ticks: { color: '#ffffff' }
          }
        }
      }
    });
  }
}
