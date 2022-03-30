import { ToastrService } from 'ngx-toastr';
import { AuthService } from './shared/auth.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthStateService } from './shared/auth-state.service';
import { TokenService } from './shared/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Accora Village';
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
          } else if(this.authService.getCurrentUserType() == 'director') {
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
