import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';
import { Stats } from './stats.interface';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule, SkeletonModule],
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent {
  @Input() firstData!: Stats;
  @Input() secondData!: Stats;
  @Input() thirdData!: Stats;

  constructor() {
  }
}
