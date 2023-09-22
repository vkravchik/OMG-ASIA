import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ReplenishmentAdviceData } from './replenishment-advice.interface';
import { ReplenishmentAdviceService } from './services/replenishment-advice.service';

@Component({
  selector: 'app-replenishment-advice',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, AvatarModule, BadgeModule],
  templateUrl: './replenishment-advice.component.html',
  styleUrls: ['./replenishment-advice.component.scss']
})
export class ReplenishmentAdviceComponent implements OnInit {
  public data!: ReplenishmentAdviceData;

  constructor(private replenishmentAdviceService: ReplenishmentAdviceService) {
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.replenishmentAdviceService.getReplenishmentAdvice({
      _search: false,
      nd: 1695412932044,
      rows: 1000,
      page: 1,
      sidx: 'SiBuHuo',
      sord: 'desc'
    }).subscribe(data => this.data = data)
  }
}
