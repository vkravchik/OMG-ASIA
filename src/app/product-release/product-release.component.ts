import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as moment from 'moment';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule, TablePageEvent } from 'primeng/table';
import { EquipmentService } from '../shared/services/equipment/equipment.service';
import { MachineGroups } from '../shared/services/equipment/machine-groups.interface';
import { MachineIds } from '../shared/services/equipment/machine-ids.interface';
import { ResultPipe } from './pipes/result.pipe';
import { ProductReleaseInfo } from './product-release.interface';
import { ProductReleaseService } from './services/product-release.service';

@Component({
  selector: 'app-product-release',
  standalone: true,
  imports: [CommonModule, SkeletonModule, DropdownModule, CalendarModule, FormsModule, TableModule, ResultPipe],
  templateUrl: './product-release.component.html',
  styleUrls: ['./product-release.component.scss']
})
export class ProductReleaseComponent implements OnInit {
  public machineGrouping!: MachineGroups;
  public machineGroups: MachineGroups[] = [];
  public machineID!: MachineIds;
  public machineIDs: MachineIds[] = [];
  public rangeDates: Date[] = [new Date('2023-09-05T00:00:00'), new Date()];
  public data!: ProductReleaseInfo;
  public numberOfRows: number = 100;
  public currentPage: number = 1;

  constructor(private equipmentService: EquipmentService,
              private productReleaseService: ProductReleaseService) {
  }

  ngOnInit() {
    this.equipmentService.getMachineGroups().subscribe((machineGroups) => {
      this.machineGroups = machineGroups;

      if (machineGroups.length === 1) {
        this.machineGrouping = machineGroups[0];
        this.onMachineGroupChange(this.machineGrouping);
      }
    });
  }

  onMachineGroupChange(machineGrouping: MachineGroups) {
    this.equipmentService.getMachineIDs({
      MachineGroup: machineGrouping.MGID
    }).subscribe((machineIDs) => {
      this.machineIDs = machineIDs;

      if (machineIDs.length === 1) {
        this.machineID = machineIDs[0];

        this.getProductReleases();
      }
    });
  }

  onDatesSelected(rangeDates: Date[]) {
    console.log(rangeDates);
    this.getProductReleases();
  }

  getProductReleases(): void {
    this.productReleaseService.getProductRelease({
      _search: false,
      nd: 1694856405355,
      rows: this.numberOfRows,
      page: this.currentPage,
      sidx: 'TrTime',
      sord: 'asc',
      Group: this.machineGrouping.MGID,
      MachineID: this.machineID.MuMachineID,
      IndexTime: moment(this.rangeDates[0]).hour(0).minutes(0).seconds(0).format('YYYY-MM-DD HH:mm:ss').toString(),
      LastTime: moment(this.rangeDates[1]).hour(23).minutes(59).seconds(59).format('YYYY-MM-DD HH:mm:ss').toString(),
      CardNo: '',
      PayType: '',
      Type: '',
      CommodityName: ''
    }).subscribe(data => {
      this.data = data;
      this.numberOfRows = data.records
    })
  }

  onPageNavigated($event: TablePageEvent) {
    console.log($event);
    this.currentPage = ($event.first/$event.rows) + 1;
    // this.getProductReleases();
  }
}
