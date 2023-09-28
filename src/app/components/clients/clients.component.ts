import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/Client';


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
export class ClientsComponent implements OnInit {
  clients: Client[]=[];
  // totalOwed!: number;
  totalBasicSalary!: number;

  // filteredList
  filteredList: Client[] = [];

  // data untuk dimunculkan:
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'basicSalary'];
  dataSource = this.clients;
  

  constructor(private clientService: ClientService) { }

  ngOnInit(){
    this.clientService.getClients().subscribe(clients => {
      this.clients = clients;

      this.getTotalBasicSalary();

      // initial search, all listed
      this.filterResults('');


      // yang memunculkan data:
      this.dataSource = this.clients;

    });

    // implement filter list:
    this.filteredList = this.clients;

    

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

  // implement filter list
  filterResults(text: string) {
    if(!text) {
      this.filteredList = this.clients;

    }

    this.filteredList = this.clients.filter(client => client?.firstName?.toLowerCase().includes(text.toLowerCase()) || client?.lastName?.toLowerCase().includes(text.toLowerCase()));
  }
}
