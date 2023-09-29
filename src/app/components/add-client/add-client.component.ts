import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';
import { SettingsService } from '../../services/settings.service';

import { Client } from '../../models/Client';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  // firstName!: string;
  // lastName!: string;
  // email!: string;
  // phone!: string;

  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    birthDate: '',
    basicSalary: 0,
    status: '',
    group: '',
    description: '',
  }

  // disableBalanceOnAdd!: boolean;
  disableBasicSalaryOnAdd!: boolean;

  @ViewChild('clientForm') form: any;

  // tentang date:
  public date;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private settingsService: SettingsService,
  ) { }

  // input tanggal maksimal di hari ini:
  maxDate = new Date();

  // select:
  selectedValue: string;

  //  date:
  selectedDate: Date;

  ngOnInit(): void {
    // this.disableBalanceOnAdd = this.settingsService.getSettings().disableBalanceOnAdd!;
    this.disableBasicSalaryOnAdd = this.settingsService.getSettings().disableBasicSalaryOnAdd!;

    
  }

  onSubmit({value, valid}: NgForm) {
    // console.log(value,valid);
    if(this.disableBasicSalaryOnAdd) {
      value.basicSalary = 0;
    }
    if(!valid) {
      // Show error
      
    } else {
      // Add new client
      this.clientService.newClient(value);
      // Show message

      // Redirect to dash
      this.router.navigate(['/']);
    }

  
  }

}
