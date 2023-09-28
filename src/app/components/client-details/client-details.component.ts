import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Router, ActivatedRoute, Params } from '@angular/router';


import { Client } from '../../models/Client';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {

  id!: string;
  client: Client|null|undefined;
  hasBasicSalary: boolean = false;


  showBasicSalaryUpdateInput: boolean = false;


  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    
  ) { }

  ngOnInit(): void {
    // Get id from url
    this.id = this.route.snapshot.params['id'];
    // Get client
    this.clientService.getClient(this.id).subscribe((client: Client|null|undefined) => {
      if(client != null) {
        if(client.basicSalary! > 0) {
          this.hasBasicSalary = true;
        }
      }

      this.client = client;


    })
  }

  updateBasicSalary() {
    this.clientService.updateClient(this.client);
    
  }

  onDeleteClick(){
    if(confirm('Are you sure?')) {
      this.clientService.deleteClient(this.client);
      
      this.router.navigate(['/']);
    }
  }

}
