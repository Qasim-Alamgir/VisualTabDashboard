import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TokenService } from 'src/app/shared/token.service';
import { AuthStateService } from 'src/app/shared/auth-state.service';
import { AuthService } from 'src/app/shared/auth.service';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  loginForm: FormGroup;
  errors = null;

  constructor(
    public router: Router,
    public authService: AuthService,
    private token: TokenService,
    private authState: AuthStateService,
    private toast: ToastrService,
    private spinner: NgxUiLoaderService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  ngOnInit() {
  }

  onSubmit() {
    this.spinner.start();
      this.authService.login(this.loginForm.value).subscribe((result) => {
        this.spinner.stop();
          if(result.success) {
            console.log(result.success)
            this.responseHandler(result);
            this.authState.setAuthState(true);
            this.authService.setCurrentUserName(result.success);
            this.authService.setCurrentUserType(result.success);
            this.loginForm.reset()
            this.toast.success('Welcome Again')
            if(result.success.user_type == 'admin') {
              this.router.navigate(['/admin']);
            }
          } else {
            this.toast.error('Please Check Your Credentials','Unauthorized')
          }
        });
  }

  // Handle response
  responseHandler(data){
    this.token.handleData(data.success.token);
  }
}
