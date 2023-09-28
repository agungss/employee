import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';
import { SettingsService } from '../../services/settings.service';

import { Client } from '../../models/Client';

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
    birthDate: 0,
    basicSalary: 0,
    status: '',
    group: '',
    description: 0,
  }

  // disableBalanceOnAdd!: boolean;
  disableBasicSalaryOnAdd!: boolean;

  @ViewChild('clientForm') form: any;

  constructor(
    private flashMessage: FlashMessagesService,
    private clientService: ClientService,
    private router: Router,
    private settingsService: SettingsService
  ) { }

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
      this.flashMessage.show('Please fill out the form correctly', {
        cssClass: 'alert-danger', timeout: 4000
      });
    } else {
      // Add new client
      this.clientService.newClient(value);
      // Show message
      this.flashMessage.show('New employee added', {
        cssClass: 'alert-success', timeout: 4000
      });
      // Redirect to dash
      this.router.navigate(['/']);
    }
  }

}
