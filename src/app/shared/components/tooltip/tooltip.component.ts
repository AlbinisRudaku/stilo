import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tooltip',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tooltip-container">
      <i class="fas fa-info-circle info-icon"></i>
      <div class="tooltip-content">
        {{ content }}
      </div>
    </div>
  `,
  styles: [`
    .tooltip-container {
      display: inline-flex;
      position: relative;
      margin-left: 0.5rem;
      vertical-align: middle;
    }

    .info-icon {
      color: var(--accent-color);
      opacity: 0.7;
      font-size: 0.9em;
      cursor: help;
      transition: all 0.3s ease;
    }

    .tooltip-container:hover {
      .info-icon {
        opacity: 1;
        transform: scale(1.1);
      }

      .tooltip-content {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }
    }

    .tooltip-content {
      position: absolute;
      bottom: 120%;
      // left: 50%;
      // transform: translateX(-50%);
      background: rgba(18, 18, 18, 0.75);
      backdrop-filter: blur(10px);
      border: 1px solid var(--glass-border);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
      padding: 0.75rem 1rem;
      border-radius: 0.75rem;
      font-size: 0.875rem;
      color: var(--text-primary);
      width: max-content;
      max-width: 300px;
      z-index: 1000;
      opacity: 0;
      visibility: hidden;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      text-align: left;
    }
  `]
})
export class TooltipComponent {
  @Input() content: string = '';
}
