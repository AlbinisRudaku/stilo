import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface WritingPatterns {
  vocabulary_usage: string;
  sentence_structure: string;
  text_organization: string;
}

@Component({
  selector: 'app-writing-patterns',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="patterns-container">
      <h3>Writing Patterns</h3>
      <div class="pattern-grid">
        <div class="pattern-item">
          <span class="label">Vocabulary Usage</span>
          <span class="value">{{ patterns.vocabulary_usage }}</span>
        </div>
        <div class="pattern-item">
          <span class="label">Sentence Structure</span>
          <span class="value">{{ patterns.sentence_structure }}</span>
        </div>
        <div class="pattern-item">
          <span class="label">Text Organization</span>
          <span class="value">{{ patterns.text_organization }}</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .patterns-container {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 1rem;
      padding: 1.5rem;

      h3 {
        font-size: 1.25rem;
        margin: 0 0 1.5rem 0;
        color: #ffffff;
      }

      .pattern-grid {
        display: grid;
        gap: 1rem;

        .pattern-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 0.5rem;

          .label {
            color: #8a8aa3;
          }

          .value {
            color: #4facfe;
            font-weight: 500;
          }
        }
      }
    }
  `]
})
export class WritingPatternsComponent {
  @Input() patterns!: WritingPatterns;
}
