import { Component, Input, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Chart } from 'chart.js/auto';

interface FeatureData {
  lexical: {
    unique_words: number;
    avg_word_length: number;
    vocabulary_richness: number;
    word_frequency_distribution: {
      common: number;
      uncommon: number;
      rare: number;
    };
  };
  syntactic: {
    avg_sentence_length: number;
    sentence_complexity: number;
    punctuation_usage: {
      commas: number;
      semicolons: number;
      colons: number;
    };
  };
  structural: {
    paragraph_count: number;
    avg_paragraph_length: number;
    coherence_score: number;
  };
}

@Component({
  selector: 'app-detailed-features',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detailed-features.component.html',
  styleUrls: ['./detailed-features.component.scss']
})
export class DetailedFeaturesComponent implements OnInit {
  @Input() features!: FeatureData;
  activeTab: 'lexical' | 'syntactic' | 'structural' = 'lexical';
  private charts: { [key: string]: Chart } = {};

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.createCharts();
      }, 0);
    }
  }

  ngOnDestroy() {
    Object.values(this.charts).forEach(chart => chart.destroy());
  }

  setActiveTab(tab: 'lexical' | 'syntactic' | 'structural') {
    this.activeTab = tab;
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => this.createCharts(), 0);
    }
  }

  private createCharts() {
    // Destroy existing charts
    Object.values(this.charts).forEach(chart => chart.destroy());
    this.charts = {};

    if (this.activeTab === 'lexical') {
      this.createWordDistributionChart();
    } else if (this.activeTab === 'syntactic') {
      this.createPunctuationChart();
    } else {
      this.createStructuralChart();
    }
  }

  private createWordDistributionChart() {
    const ctx = document.getElementById('wordDistributionChart') as HTMLCanvasElement;
    if (!ctx) return;

    this.charts['wordDistribution'] = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Common', 'Uncommon', 'Rare'],
        datasets: [{
          data: [
            this.features.lexical.word_frequency_distribution.common,
            this.features.lexical.word_frequency_distribution.uncommon,
            this.features.lexical.word_frequency_distribution.rare
          ],
          backgroundColor: ['#4facfe', '#00f2fe', '#2E3192']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: '#ffffff' }
          }
        }
      }
    });
  }

  private createPunctuationChart() {
    const ctx = document.getElementById('punctuationChart') as HTMLCanvasElement;
    if (!ctx) return;

    this.charts['punctuation'] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Commas', 'Semicolons', 'Colons'],
        datasets: [{
          label: 'Usage Count',
          data: [
            this.features.syntactic.punctuation_usage.commas,
            this.features.syntactic.punctuation_usage.semicolons,
            this.features.syntactic.punctuation_usage.colons
          ],
          backgroundColor: '#4facfe'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            ticks: {
              color: '#ffffff'
            }
          },
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: '#ffffff'
            }
          }
        }
      }
    });
  }

  private createStructuralChart() {
    const ctx = document.getElementById('structuralChart') as HTMLCanvasElement;
    if (!ctx) return;

    this.charts['structural'] = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['Paragraph Count', 'Avg Length', 'Coherence'],
        datasets: [{
          data: [
            this.features.structural.paragraph_count,
            this.features.structural.avg_paragraph_length,
            this.features.structural.coherence_score
          ],
          backgroundColor: 'rgba(79, 172, 254, 0.2)',
          borderColor: '#4facfe',
          pointBackgroundColor: '#4facfe'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          r: {
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            pointLabels: {
              color: '#ffffff'
            },
            ticks: {
              color: '#ffffff'
            }
          }
        }
      }
    });
  }
}
