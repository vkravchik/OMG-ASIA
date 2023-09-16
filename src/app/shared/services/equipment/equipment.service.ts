import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MachineGroups } from './machine-groups.interface';
import { MachineIds } from './machine-ids.interface';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  constructor(private http: HttpClient) { }

  getMachineGroups(): Observable<MachineGroups[]> {
    return this.http.post<MachineGroups[]>('api/SaleSummarize/GetMachineGroup', {});
  }

  getMachineIDs(params: {MachineGroup: string}): Observable<MachineIds[]> {
    return this.http.post<MachineIds[]>('api/SaleSummarize/GetMachineID', params);
  }
}
