import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductReleaseData } from '../product-release.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductReleaseService {

  constructor(private http: HttpClient) {
  }

  getProductRelease(params: {
    _search?: boolean;
    nd?: number;
    rows?: number;
    page?: number;
    sidx?: string;
    sord?: string;
    Group?: string;
    MachineID?: string;
    IndexTime?: Date | string;
    LastTime?: Date | string;
    CardNo?: string;
    PayType?: string;
    Type?: string;
    CommodityName?: string;
  }): Observable<ProductReleaseData> {
    return this.http.post<ProductReleaseData>('api/OutReport/ListJson/?firstload=0', params);
  }
}
