import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as moment from 'moment';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { map } from 'rxjs';
import { SearchToolbarComponent } from '../shared/components/search-toolbar/search-toolbar.component';
import { StatsComponent } from '../shared/components/stats/stats.component';
import { MachineGroups } from '../shared/services/equipment/types/machine-groups.interface';
import { MachineIds } from '../shared/services/equipment/types/machine-ids.interface';
import { SlotInfoService } from '../slot-info/services/slot-info.service';
import { SlotInfoDictionary } from '../slot-info/types/slot-info-dictionary.interface';
import { ResultPipe } from './pipes/result.pipe';
import { Results } from './pipes/results.enum';
import { ProductRelease, ProductReleaseData } from './product-release.interface';
import { ProductReleaseService } from './services/product-release.service';

@Component({
  selector: 'app-product-release',
  standalone: true,
  imports: [CommonModule, SkeletonModule, DropdownModule, CalendarModule, FormsModule, TableModule, ResultPipe, StatsComponent, BadgeModule, AvatarModule, SearchToolbarComponent],
  templateUrl: './product-release.component.html',
  styleUrls: ['./product-release.component.scss']
})
export class ProductReleaseComponent implements OnInit {
  public machineGrouping!: MachineGroups;
  public machineID!: MachineIds;
  public rangeDates: Date[] = [new Date(), new Date()];
  // public rangeDates: Date[] = [new Date('2023-09-05T00:00:00'), new Date()];

  public data!: ProductReleaseData;
  public slotInfo!: SlotInfoDictionary;

  public readonly Results = Results;

  constructor(private productReleaseService: ProductReleaseService,
              private slotInfoService: SlotInfoService) {
  }

  ngOnInit() {

  }

  onMachineGroupSelected(machineGroup: MachineGroups): void {
    this.machineGrouping = machineGroup;
  }

  onMachineIDSelected(machineID: MachineIds): void {
    this.machineID = machineID;
    this.getSlotInfo();
    this.getProductReleases();
  }

  onDatesSelected(rangeDates: Date[]) {
    this.getProductReleases();
  }

  public getProductReleases(): void {
    this.productReleaseService.getProductRelease({
      _search: false,
      nd: 1694856405355,
      rows: 1000,
      page: 1,
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
    }).subscribe(data => this.data = data)
  }

  private getSlotInfo(): void {
    this.slotInfoService.getSlotInfo({
      MachineID: this.machineID.MuMachineID
    }).pipe(map(slotInfo => {
      const slotInfoDictionary: SlotInfoDictionary = {};

      slotInfo.forEach(item => {
        slotInfoDictionary[item.SiCoilId] = {
          ...item
        }
      });

      return slotInfoDictionary;
    })).subscribe((slotInfo) => {
      this.slotInfo = slotInfo;
    });
  }

  getTotalCountByProductCode(productCode: string): string {
    return this.data.rows.reduce((accum: number, item: ProductRelease): number => {
      if (item.Prcode === productCode) {
        return accum + 1;
      }

      return accum;
    }, 0).toString();
  }

  toggleRow(expanded: boolean): boolean {
    return expanded;
  }
}
