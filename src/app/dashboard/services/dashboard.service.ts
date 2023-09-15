import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ab2strMapper, lastEightDayDataMapper, payTypesDataMapper, } from '../../shared/helpers/response.helper';
import { LastEightDay } from '../interfaces/last-eight-day.interface';
import { PayTypes } from '../interfaces/pay-types.interface';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private httpOptions: any = {
    headers: new HttpHeaders({
      'Accept': 'text/html, application/xhtml+xml, */*',
      'Content-Type': 'application/x-www-form-urlencoded'
    }),
    responseType: 'text'
  };

  constructor(private http: HttpClient) {
  }

  dayData(): Observable<any> {
    return this.http.post('api/YSHome/DayData', {}, this.httpOptions).pipe(map((response) => ab2strMapper(response)))
  }

  yesterdayData(): Observable<any> {
    return this.http.post('api/YSHome/YesterDayData', {}, this.httpOptions).pipe(map((response) => ab2strMapper(response)))
  }

  monthData(): Observable<any> {
    return this.http.post('api/YSHome/MonthData', {}, this.httpOptions).pipe(map((response) => ab2strMapper(response)))
  }

  lastEightDayData(): Observable<LastEightDay[]> {
    return this.http.post<LastEightDay[]>('api/YSHome/Total_8', {}).pipe(map((response) => lastEightDayDataMapper(response)))
  }

  payTypesData(): Observable<PayTypes[]> {
    return this.http.post<PayTypes[]>('api/YSHome/Total_PayType', {}).pipe(map((response) => payTypesDataMapper(response)))
  }
}
