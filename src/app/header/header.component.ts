import { Component, OnInit  } from '@angular/core';
import { AuthenticationService, User } from '../_services';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit { 
  public currentUser!: User;
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
  ) { 
  }

  ngOnInit(): void {
    this.getUserDetail();
  }
  getUserDetail(){
   this.currentUser =  this.authenticationService.getCurrentUser();
   console.log(this.currentUser.name)
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
    window.location.reload();
  }
}
