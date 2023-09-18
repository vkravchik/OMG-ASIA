import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as moment from 'moment';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { map } from 'rxjs';
import { EquipmentService } from '../shared/services/equipment/equipment.service';
import { MachineGroups } from '../shared/services/equipment/types/machine-groups.interface';
import { MachineIds } from '../shared/services/equipment/types/machine-ids.interface';
import { SlotService } from '../shared/services/slot/slot.service';
import { SlotInfoDictionary } from '../shared/services/slot/types/slot-info-dictionary.interface';
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
  public machineGroups: MachineGroups[] = [];
  public machineIDs: MachineIds[] = [];

  public machineGrouping!: MachineGroups;
  public machineID!: MachineIds;
  public rangeDates: Date[] = [new Date(), new Date()];
  // public rangeDates: Date[] = [new Date('2023-09-05T00:00:00'), new Date()];

  public data!: ProductReleaseInfo;
  public slotInfo!: SlotInfoDictionary;

  constructor(private equipmentService: EquipmentService,
              private productReleaseService: ProductReleaseService,
              private slotService: SlotService) {
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


        this.getSlotInfo();
        this.getProductReleases();
      }
    });
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
    this.slotService.getSlotInfo({
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

  onImageLoaded(event: Event) {
    console.log(event.target);
  }
}
