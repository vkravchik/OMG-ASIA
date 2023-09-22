import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem, PrimeIcons, SharedModule } from 'primeng/api';
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
        label: 'Dashboard',
        icon: PrimeIcons.CHART_BAR,
        routerLink: '/dashboard',
        command: () => {
          this.onMenuHide();
        }
      },
      {
        label: 'Product Release',
        icon: PrimeIcons.SHOPPING_CART,
        routerLink: '/product-release',
        command: () => {
          this.onMenuHide();
        }
      },
      {
        label: 'Slot Info',
        icon: PrimeIcons.TABLE,
        routerLink: '/slot-info',
        command: () => {
          this.onMenuHide();
        }
      },
      {
        label: 'Replenishment Advice',
        icon: PrimeIcons.REPLAY,
        routerLink: '/replenishment-advice',
        command: () => {
          this.onMenuHide();
        }
      },
    ];
  }

  public onMenuHide(): void {
    this.onHideEvent.emit(true);
  }
}
