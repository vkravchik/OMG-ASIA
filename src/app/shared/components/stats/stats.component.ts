import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule, SkeletonModule],
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent {
  @Input() todayData: number = 0;
  @Input() yesterdayData: number = 0;
  @Input() monthData: number = 0;

  constructor() {
  }
}
