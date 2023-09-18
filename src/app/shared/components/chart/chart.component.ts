import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule, ChartModule, SkeletonModule],
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent {
  @Input() data: any;
  @Input() options: any;
  @Input() type: any;

}
