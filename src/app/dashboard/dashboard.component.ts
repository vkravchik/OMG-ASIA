import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { SkeletonModule } from 'primeng/skeleton';
import { combineLatest, forkJoin, tap } from 'rxjs';
import { ChartComponent } from '../shared/components/chart/chart.component';
import { StatsComponent } from '../shared/components/stats/stats.component';
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
  public countChartData!: any;
  public countChartOptions!: any;
  public saleChartData!: any;
  public saleChartOptions!: any;
  public payTypesChartData!: any;
  public payTypesChartOptions!: any;

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
        const {data: countData, options: countOptions} = this.dashboardChartService.prepareCountChart(value.lastEightDayData);
        this.countChartData = countData;
        this.countChartOptions = countOptions;
      }),
      tap((value) => {
        const {data: saleData, options: saleOptions} = this.dashboardChartService.prepareSaleChart(value.lastEightDayData);
        this.saleChartData = saleData;
        this.saleChartOptions = saleOptions;
      }),
      tap((value) => {
        const {data: payTypesData, options: payTypesOptions} = this.dashboardChartService.preparePayTypesChart(value.payTypesData);
        this.payTypesChartData = payTypesData;
        this.payTypesChartOptions = payTypesOptions;
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
