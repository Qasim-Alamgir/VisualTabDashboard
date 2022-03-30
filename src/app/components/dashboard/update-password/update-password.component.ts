import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

  profileForm: FormGroup;
  isFormSubmitted =  false
  constructor(
    public api: ApiService,
    public toast: ToastrService,
    public spinner: NgxSpinnerService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.initialize();
  }
  initialize() {
    this.profileForm = new FormGroup({
      password: new FormControl('', [Validators.required,  Validators.minLength(8)]),
      c_password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }
  updatePPassword() {
    this.spinner.show();
    if(this.profileForm.get('password').value == this.profileForm.get('c_password').value) {
      this.api.post('updatePassword', this.profileForm.value).subscribe((data) => {
        this.spinner.hide();
        if(!data.error) {
          this.toast.success('Password Updated Successfully');
          this.auth.logout();
          window.location.reload();
        } else {
          this.toast.warning(data.msg)
        }
      })
    } else {
      this.spinner.hide();
      this.toast.warning('Passwords are not matched');
    }
  }
}
