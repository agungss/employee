import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/Client';



import { LiveAnnouncer } from '@angular/cdk/a11y';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import { MatPaginator } from '@angular/material/paginator';


import { SearchService } from 'src/app/services/search.service';
import { Search } from 'src/app/models/Search';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],

})
export class ClientsComponent implements OnInit, AfterViewInit {
  clients: Client[]=[];
  search: Search;
  // totalOwed!: number;
  totalBasicSalary!: number;

  // filteredList
  filteredList: Client[] = [];

  // loaded text:
  loadedText: string;

  // data untuk dimunculkan:
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'basicSalary'];


  dataSource = new MatTableDataSource(this.clients);



  // filtering:
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  

  constructor(private clientService: ClientService, private _liveAnnouncer: LiveAnnouncer, private searchService: SearchService) { }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
      console.log(`${sortState.direction}`);
      
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }

    // simpan search state:
    this.searchService.changeSearch(this.search);
  }

  ngOnInit(){
    this.clientService.getClients().subscribe(clients => {
      this.clients = clients;

      this.getTotalBasicSalary();


      // yang memunculkan data:
      this.dataSource = new MatTableDataSource(this.clients);

      // nge-sort data:
      this.dataSource.sort = this.sort;

      this.dataSource.paginator = this.paginator;


      //format date:
      // Intl.DateTimeFormat('en-US').format(d);
      this.reload();
      
    });

    // implement filter list:
    this.filteredList = this.clients;

    // search state:
    
  }

  // getTotalOwed() {
  //   this.totalOwed = this.clients.reduce((total,client) => {
  //     return total + parseFloat(client.basicSalary!.toString());
  //   },0);

  // }

  getTotalBasicSalary() {
    this.totalBasicSalary = this.clients.reduce((total,client) => {
      return total + parseFloat(client.basicSalary!.toString());
    },0);

  }


  searchChange(searchedText) {
    // save, need stringify
    // localStorage.setItem('search', JSON.stringify(this.search));
    
    searchedText = (<HTMLInputElement>document.getElementById('searchedText')).value;
    localStorage.setItem("text", searchedText);

    console.log(searchedText);
  }

  reload() {
    this.loadedText = localStorage.getItem('text');
    document.getElementById('searchedText').innerHTML = this.loadedText;
  }

}
