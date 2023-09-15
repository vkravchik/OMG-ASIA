import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js';
import { ChartModule } from 'primeng/chart';
import { SkeletonModule } from 'primeng/skeleton';
import { combineLatest, forkJoin, tap } from 'rxjs';
import { ChartComponent } from '../shared/components/chart/chart.component';
import { StatsComponent } from '../shared/components/stats/stats.component';
import { Charts } from './interfaces/charts.interface';
import { LastEightDay } from './interfaces/last-eight-day.interface';
import { PayTypes } from './interfaces/pay-types.interface';
import { DashboardChartService } from './services/dashboard-chart.service';
import { DashboardService } from './services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, StatsComponent, ChartModule, ChartComponent, SkeletonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public todayData: string = 'None';
  public yesterdayData: string = 'None';
  public monthData: string = 'None';
  public lastEightDayData: LastEightDay[] = [];
  public payTypesData: PayTypes[] = [];

  // Charts
  public charts: Charts = {};

  constructor(private dashboardService: DashboardService, private dashboardChartService: DashboardChartService) {
  }

  ngOnInit() {
    combineLatest({
      todayData: this.dashboardService.dayData(),
      yesterdayData: this.dashboardService.yesterdayData(),
      monthData: this.dashboardService.monthData(),
      lastEightDayData: this.dashboardService.lastEightDayData(),
      payTypesData: this.dashboardService.payTypesData(),
    }).pipe(
      tap((value) => {
        const {data, options} = this.dashboardChartService.prepareCountChart(value.lastEightDayData);
        this.charts['countChart'] = {
          data,
          options
        }
      }),
      tap((value) => {
        const {data, options} = this.dashboardChartService.prepareSaleChart(value.lastEightDayData);
        this.charts['saleChart'] = {
          data,
          options
        }
      }),
      tap((value) => {
        const {data, options} = this.dashboardChartService.preparePayTypesChart(value.payTypesData);
        this.charts['payTypesChart'] = {
          data,
          options
        }
      })
    ).subscribe(response => {
      this.todayData = response.todayData
      this.yesterdayData = response.yesterdayData
      this.monthData = response.monthData
      this.lastEightDayData = response.lastEightDayData;
      this.payTypesData = response.payTypesData;
    });
  }
}
