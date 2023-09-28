import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

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
    birthDate: 0,
    basicSalary: 0,
    status: '',
    group: '',
    description: 0,
  }
  disableBalanceOnEdit!: boolean;


  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService,
    private settingsService: SettingsService
  ) { }

  ngOnInit(): void {
    this.disableBalanceOnEdit = this.settingsService.getSettings().disableBalanceOnEdit!;
    // Get id from url
    this.id = this.route.snapshot.params['id'];
    // Get client
    this.clientService.getClient(this.id).subscribe(client  =>
      this.client = client);
  }

  onSubmit({value, valid}: NgForm) {
    if(!valid) {
      this.flashMessage.show('Please fill out the form correctly', {
        cssClass: 'alert-danger', timeout: 4000
      });
    } else {
      // add id to client
      // karena id belum ada disini, maka didatangkan dari luar
      value.id = this.id;
      // update client
      this.clientService.updateClient(value);
      this.flashMessage.show('Employee updated', {
        cssClass: 'alert-success', timeout: 4000
      });
      this.router.navigate(['/client/'+this.id]);
    }
  }
}
