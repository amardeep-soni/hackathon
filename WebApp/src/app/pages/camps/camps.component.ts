import { Component, inject, OnInit } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { SliderModule } from 'primeng/slider';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  Camp,
  CampsServiceProxy,
} from '../../../shared/service-proxies/service-proxies';
import { ServiceProxyModule } from '../../../shared/service-proxies/service-proxy.module';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-camps',
  standalone: true,
  imports: [
    PaginatorModule,
    ButtonModule,
    DividerModule,
    SliderModule,
    FormsModule,
    ServiceProxyModule,
    ProgressSpinnerModule,
    FormsModule
  ],
  templateUrl: './camps.component.html',
  styleUrl: './camps.component.css',
})
export class CampsComponent implements OnInit {
  constructor(public _campsService: CampsServiceProxy) { }
  loading = false;
  camps: Camp[] = [];
  filteredCamps: Camp[] = [];
  searchQuery: string = ''
  ngOnInit(): void {
    this.loading = true;
    window.scrollTo(0, 0);
    this._campsService.getAll().subscribe((data) => {
      if (data) {
        this.loading = false;
        this.camps = data;
        this.filteredCamps = this.camps;
        console.log(this.camps);
      }
    });
  }
  onSearchQueryChange() {
    if (this.searchQuery.length == 0) {
      this.filteredCamps = [...this.camps]
    } else {
      this.filteredCamps = this.camps.filter((camp) => camp.campName.toLowerCase().includes(this.searchQuery.toLowerCase()));
    }
  }
  router = inject(Router);
  first: number = 0;
  rows: number = 10;

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }
  onCardClick(id: number) {
    this.router.navigate(['camps', id]);
  }
}
