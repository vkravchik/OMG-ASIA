import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SlotInfo } from '../types/slot-info.interface';

@Injectable({
  providedIn: 'root'
})
export class SlotInfoService {

  constructor(private http: HttpClient) { }

  getSlotInfo(params: {
    MachineID: string;
    boxId?: string;
  }): Observable<SlotInfo[]> {
    return this.http.post<SlotInfo[]>('api/Selection/SoltInfo', params);
  }
}
