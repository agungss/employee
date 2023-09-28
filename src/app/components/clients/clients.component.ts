import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/Client';

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

  constructor(private clientService: ClientService) { }

  ngOnInit(){
    this.clientService.getClients().subscribe(clients => {
      this.clients = clients;
      this.getTotalBasicSalary();

      // initial search, all listed
      this.filterResults('');

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
