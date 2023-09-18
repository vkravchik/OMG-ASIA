import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, AvatarModule, BadgeModule, ButtonModule, MenubarModule, SharedModule, SidebarComponent],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  public menuIcon: string = 'pi pi-bars';
  public isMenuVisible: boolean = false;

  @Output() onToggle: EventEmitter<boolean> = new EventEmitter();

  public toggleMenu(): void {
    this.isMenuVisible = !this.isMenuVisible;

    this.menuIcon = this.isMenuVisible ? 'pi pi-times' : 'pi pi-bars'
    this.onToggle.emit(this.isMenuVisible)
  }
}
