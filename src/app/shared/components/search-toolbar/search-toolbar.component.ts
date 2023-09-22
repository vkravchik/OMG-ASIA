import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { EquipmentService } from '../../services/equipment/equipment.service';
import { MachineGroups } from '../../services/equipment/types/machine-groups.interface';
import { MachineIds } from '../../services/equipment/types/machine-ids.interface';

@Component({
  selector: 'app-search-toolbar',
  standalone: true,
  imports: [CommonModule, CalendarModule, DropdownModule, FormsModule],
  templateUrl: './search-toolbar.component.html',
  styleUrls: ['./search-toolbar.component.scss']
})
export class SearchToolbarComponent implements OnInit {
  public machineGroups: MachineGroups[] = [];
  public machineIDs: MachineIds[] = [];

  public machineGrouping!: MachineGroups;
  public machineID!: MachineIds;

  @Output() onMachineGroupSelected: EventEmitter<MachineGroups> = new EventEmitter<MachineGroups>();
  @Output() onMachineIDSelected: EventEmitter<MachineIds> = new EventEmitter<MachineIds>();

  constructor(private equipmentService: EquipmentService) {

  }

  ngOnInit() {
    this.equipmentService.getMachineGroups().subscribe((machineGroups) => {
      this.machineGroups = machineGroups

      if (machineGroups.length === 1) {
        this.machineGrouping = machineGroups[0];
        this.onMachineGroupChange(machineGroups[0]);
        this.onMachineGroupSelected.emit(machineGroups[0]);
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
        this.onMachineIDSelected.emit(machineIDs[0]);
      }
    });
  }
}
