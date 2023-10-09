import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
// import { FlashMessagesService } from 'angular2-flash-messages';

import { Client } from '../../models/Client';
import { NgForm } from '@angular/forms';

import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  id!: string;
  client: Client|null|undefined = {
    firstName: '',
    lastName: '',
    email: '',
    birthDate: '',
    basicSalary: 0,
    status: '',
    group: '',
    description: '',
  }
  disableBalanceOnEdit!: boolean;

  // max date:
  maxDate = new Date();

  // to hold current saved date:
  savedbirthDate = new Date();
  savedDescription = new Date();
  

  // selected value:
  selectedValue: string;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private settingsService: SettingsService
  ) { }

  ngOnInit(): void {

    this.disableBalanceOnEdit = this.settingsService.getSettings().disableBalanceOnEdit!;
    // Get id from url
    this.id = this.route.snapshot.params['id'];
    // Get client
    this.clientService.getClient(this.id).subscribe(client  => 
      {
        this.client = client
        
        // this.outputDate = new Date(this.client.birthDate);
        console.log('this.client.birthDate value: ' + this.client.birthDate);
        console.log('this.client.birthDate type: ' + typeof(this.client.birthDate.toDate()));
        
        // hold the saved date:
        this.savedbirthDate = this.client.birthDate.toDate();
        this.savedDescription = this.client.description.toDate();
        
      }
      );
      

    
  }

  onSubmit({value, valid}: NgForm) {
    if(!valid) {
      // tambah error message:
      
    } else {
      // add id to client
      // karena id belum ada disini, maka didatangkan dari luar
      value.id = this.id;
      // update client
      this.clientService.updateClient(value);
      
      this.router.navigate(['/client/'+this.id]);
    }
  }

  unixTime(unixtime) {

    var u = new Date(unixtime*1000);

      return u.getUTCFullYear() +
        '-' + ('0' + u.getUTCMonth()).slice(-2) +
        '-' + ('0' + u.getUTCDate()).slice(-2) + 
        ' ' + ('0' + u.getUTCHours()).slice(-2) +
        ':' + ('0' + u.getUTCMinutes()).slice(-2) +
        ':' + ('0' + u.getUTCSeconds()).slice(-2) +
        '.' + (u.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) 
    };
}
