import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { AuthStateService } from 'src/app/shared/auth-state.service';
import { TokenService } from 'src/app/shared/token.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isSignedIn: boolean;
  constructor(
    private auth: AuthStateService,
    private authService: AuthService,
    public router: Router,
    public token: TokenService,
    private toast: ToastrService
  ) {
  }

  ngOnInit() {
    this.auth.userAuthState.subscribe(val => {
        this.isSignedIn = val;
        if(this.isSignedIn) {
          if(this.authService.getCurrentUserType() == 'dev') {
            this.router.navigate(['/admin'])
          } else if(this.authService.getCurrentUserType() == 'admin') {
            this.router.navigate(['/admin'])
          } else if(this.authService.getCurrentUserType() == 'manager') {
            this.router.navigate(['/admin'])
          } else if(this.authService.getCurrentUserType() == 'superviser') {
            this.router.navigate(['/admin'])
          }
        } else {
          this.router.navigate(['/login'])
        }
    });
  }

}
