import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { Camp, CampsServiceProxy } from '../../shared/service-proxies/service-proxies';

import { forkJoin } from 'rxjs';

interface DropdownOption {
  name: string;
  code: string; // Unique identifier for the camp
}

@Component({
  selector: 'app-compare-camps',
  standalone: true,
  imports: [FormsModule, DropdownModule, TableModule, CommonModule],
  templateUrl: './compare-camps.component.html',
  styleUrls: ['./compare-camps.component.css'],
})
export class CompareCampsComponent {
  camps: Camp[] = []; // All camps from service
  dropdownOptions: DropdownOption[] = []; // Dropdown options for camps
  selectedCamp1: DropdownOption | undefined; // First selected camp
  selectedCamp2: DropdownOption | undefined; // Second selected camp
  tableData: any[] = []; // Rows for table data

  constructor(public _campsService: CampsServiceProxy) {}

  ngOnInit() {
    // Fetch all camps from the service
    this._campsService.getAll().subscribe((res: Camp[]) => {
      this.camps = res;
      this.dropdownOptions = this.camps.map((camp) => ({
        name: camp.campName,
        code: camp.id.toString(),
      }));
    });
  }


  updateTableData() {
    if (this.selectedCamp1 && this.selectedCamp2) {
      // Extract the IDs of the selected camps
      const camp1Id = Number(this.selectedCamp1.code);
      const camp2Id = Number(this.selectedCamp2.code);
  
      // Fetch both camps using `forkJoin`
      forkJoin([
        this._campsService.getById(camp1Id),
        this._campsService.getById(camp2Id)
      ]).subscribe(([camp1, camp2]) => {
        // Populate the table with the fetched camp data
        this.tableData = [
          { field: 'Camp Name', camp1: camp1.campName, camp2: camp2.campName },
          { field: 'Category', camp1: camp1.category, camp2: camp2.category },
          { field: 'Location', camp1: camp1.address, camp2: camp2.address },
          { field: 'Description', camp1: camp1.category, camp2: camp2.category },
        ];
      }, (error) => {
        console.error('Error fetching camp details:', error);
      });
    } else {
      // Clear the table if both camps are not selected
      this.tableData = [];
    }
  }
  
}
