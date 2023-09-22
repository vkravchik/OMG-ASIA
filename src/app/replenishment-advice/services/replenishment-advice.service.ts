import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReplenishmentAdviceData } from '../replenishment-advice.interface';

@Injectable({
  providedIn: 'root'
})
export class ReplenishmentAdviceService {

  constructor(private http: HttpClient) {
  }

  getReplenishmentAdvice(params: {
    _search?: boolean,
    nd?: number,
    rows?: number,
    page?: number,
    sidx?: string,
    sord?: string
  }): Observable<ReplenishmentAdviceData> {
    return this.http.post<ReplenishmentAdviceData>('api/ReplenishmentProposal/ListJson2', params)
  }
}
