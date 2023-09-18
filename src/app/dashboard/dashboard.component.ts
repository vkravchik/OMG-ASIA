import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { SkeletonModule } from 'primeng/skeleton';
import { combineLatest, tap } from 'rxjs';
import { ChartComponent } from '../shared/components/chart/chart.component';
import { StatsComponent } from '../shared/components/stats/stats.component';
import { Stats } from '../shared/components/stats/stats.interface';
import { Charts } from './interfaces/charts.interface';
import { LastEightDay } from './interfaces/last-eight-day.interface';
import { PayTypes } from './interfaces/pay-types.interface';
import { DashboardChartService } from './services/dashboard-chart.service';
import { DashboardService } from './services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, StatsComponent, ChartModule, ChartComponent, SkeletonModule],
  providers: [CurrencyPipe],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public todayData!: Stats;
  public yesterdayData!: Stats;
  public monthData!: Stats;

  public lastEightDayData: LastEightDay[] = [];
  public payTypesData: PayTypes[] = [];

  // Charts
  public charts: Charts = {};

  constructor(private currency: CurrencyPipe, private dashboardService: DashboardService, private dashboardChartService: DashboardChartService) {
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
        const {data, options, type} = this.dashboardChartService.prepareCountChart(value.lastEightDayData);
        this.charts['countChart'] = {
          data,
          options,
          type
        }
      }),
      tap((value) => {
        const {data, options, type} = this.dashboardChartService.prepareSaleChart(value.lastEightDayData);
        this.charts['saleChart'] = {
          data,
          options,
          type
        }
      }),
      tap((value) => {
        const {data, options, type} = this.dashboardChartService.preparePayTypesChart(value.payTypesData);
        this.charts['payTypesChart'] = {
          data,
          options,
          type
        }
      })
    ).subscribe(response => {
      this.todayData = {
        value: this.currency.transform(response.todayData, '₴') || '',
        text: `Today's revenue`,
        icon: 'pi pi-shopping-cart text-blue-500 text-xl'
      };
      this.yesterdayData = {
        value: this.currency.transform(response.yesterdayData, '₴') || '',
        text: `Yesterday's revenue`,
        icon: 'pi pi-shopping-cart text-blue-500 text-xl'
      };
      this.monthData = {
        value: this.currency.transform(response.monthData, '₴') || '',
        text: `Revenue of the month`,
        icon: 'pi pi-shopping-cart text-blue-500 text-xl'
      };

      this.lastEightDayData = response.lastEightDayData;
      this.payTypesData = response.payTypesData;
    });
  }
}
