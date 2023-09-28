import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn!: boolean;
  loggedInUser!: string;
  showRegister!: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private settingsService: SettingsService
  ) { }

  ngOnInit(): void {
    // copy from ngOnInit of login component, and modify in if statement {}
    this.authService.getAuth().subscribe(auth => {
      if(auth) {
        this.isLoggedIn = true;
        this.loggedInUser = auth.email!;
      } else {
        this.isLoggedIn = false;
      }
    });

    this.showRegister = this.settingsService.getSettings().allowRegistration!;
  }

  onLogoutClick() {
    this.authService.logout();
    
    //redirect to login page:
    this.router.navigate(['/login']);
  }

}
