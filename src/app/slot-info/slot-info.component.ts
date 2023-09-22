import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { SearchToolbarComponent } from '../shared/components/search-toolbar/search-toolbar.component';
import { MachineGroups } from '../shared/services/equipment/types/machine-groups.interface';
import { MachineIds } from '../shared/services/equipment/types/machine-ids.interface';
import { SlotInfoService } from './services/slot-info.service';
import { SlotInfo } from './types/slot-info.interface';

@Component({
  selector: 'app-slot-info',
  standalone: true,
  imports: [CommonModule, DataViewModule, CalendarModule, SearchToolbarComponent, TagModule],
  templateUrl: './slot-info.component.html',
  styleUrls: ['./slot-info.component.scss']
})
export class SlotInfoComponent implements OnInit {
  public slotInfo!: SlotInfo[];
  public layout: "list" | "grid" = "grid";

  private machineGrouping!: MachineGroups;
  private machineID!: MachineIds;

  constructor(private slotInfoService: SlotInfoService) {
  }

  ngOnInit() {

  }

  onMachineGroupSelected(machineGroup: MachineGroups): void {
    this.machineGrouping = machineGroup;
  }

  onMachineIDSelected(machineID: MachineIds): void {
    this.machineID = machineID;
    this.getSlotInfo();
  }

  private getSlotInfo() {
    this.slotInfoService.getSlotInfo({
      MachineID: this.machineID.MuMachineID
    }).subscribe((slotInfo) => {
      this.slotInfo = slotInfo.filter(slot => slot.PrImgUrl && slot.SiBarCode);
    });
  }
}
