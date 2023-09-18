import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem, SharedModule } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { SidebarModule } from 'primeng/sidebar';

@Component({
  selector: 'app-sidebar',
  standalone: true,
    imports: [CommonModule, MenuModule, SharedModule, SidebarModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() isMenuVisible!: boolean;

  @Output() onHideEvent: EventEmitter<boolean> = new EventEmitter();

  public items!: MenuItem[];

  ngOnInit() {
    this.items = [
      {
        label: 'File',
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
      }
    ];
  }

  public onMenuHide(): void {
    this.onHideEvent.emit(true);
  }
}
