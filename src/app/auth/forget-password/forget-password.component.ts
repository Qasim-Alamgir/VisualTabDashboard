import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TokenService } from 'src/app/shared/token.service';
import { AuthStateService } from 'src/app/shared/auth-state.service';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  forgetForm: FormGroup;
  errors = null;

  constructor(
    public router: Router,
    public authService: AuthService,
    private token: TokenService,
    private authState: AuthStateService,
    private toast: ToastrService,
    private spinner: NgxUiLoaderService
  ) {
    this.forgetForm = new FormGroup({
      email: new FormControl('', [Validators.required])
    })
  }

  ngOnInit() {
  }

  onSubmit() {
    this.spinner.start();
      this.authService.forgetPassword(this.forgetForm.value).subscribe((result) => {
        this.spinner.stop();
          if(!result.error) {
            this.forgetForm.reset()
            this.toast.success('Password is sent at your email.')
            this.router.navigate(['/login']);
          } else {
            this.toast.error(result.msg)
          }
    });
  }

  // Handle response
  responseHandler(data){
    this.token.handleData(data.success.token);
  }
}
