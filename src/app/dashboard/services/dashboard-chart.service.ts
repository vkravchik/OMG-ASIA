import { Injectable } from '@angular/core';
import { LastEightDay } from '../interfaces/last-eight-day.interface';
import { PayTypes } from '../interfaces/pay-types.interface';

export interface ChartConfig {
  data: any;
  options: any;
  type: any;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardChartService {

  constructor() { }

  prepareCountChart(input: LastEightDay[]): ChartConfig {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    const data = {
      labels: input.map((item) => new Date(+item.PTime).toDateString()),
      datasets: [
        {
          label: 'Кількість',
          data: [0, ...input.map((item) => item.TotalCount)],
          fill: true,
          borderColor: documentStyle.getPropertyValue('--orange-500'),
          tension: 0.4,
          backgroundColor: 'rgba(255,167,38,0.2)'
        }
      ]
    };

    const options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };

    return {
      data,
      options,
      type: 'line'
    }
  }

  prepareSaleChart(input: LastEightDay[]): ChartConfig {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    const data = {
      labels: input.map((item) => new Date(+item.PTime).toDateString()),
      datasets: [
        {
          label: 'Продажі',
          data: input.map((item) => item.TotalAmount),
          backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
          borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
          borderWidth: 1
        }
      ]
    };

    const options = {
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };

    return {
      data,
      options,
      type: 'bar'
    }
  }

  preparePayTypesChart(input: PayTypes[]): ChartConfig {
    const documentStyle = getComputedStyle(document.documentElement);

    const data = {
      labels: input.map((item) => item.PayName),
      datasets: [
        {
          data: input.map((item) => item.TotalCount),
          backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--orange-300'), documentStyle.getPropertyValue('--green-500')],
          hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--orange-200'), documentStyle.getPropertyValue('--green-400')]
        }
      ]
    };

    const options = {
      responsive: true,
        plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
            text: 'Оплата / Подарунок'
        }
      }
    };

    return {
      data,
      options,
      type: 'pie'
    }
  }
}
