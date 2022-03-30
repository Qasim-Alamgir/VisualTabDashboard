import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-push-notifications',
  templateUrl: './push-notifications.component.html',
  styleUrls: ['./push-notifications.component.css']
})
export class PushNotificationsComponent implements OnInit {

  sendMsgForm: FormGroup;
  isUser = this.auth.getCurrentUserType();
  departments = localStorage.getItem('department');
  departmentsData = [
    {value: 'All Departments', department: 'All Departments'}
  ]
  roles = [
    {'name': 'All', value: 'All'}
  ]
  constructor(
    private toast: ToastrService,
    public spinner: NgxSpinnerService,
    public api: ApiService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    if(this.isUser == 'dev' || this.isUser == 'admin') {
      let data = JSON.parse(localStorage.getItem('departments'));
      data.forEach(element => {
        this.departmentsData.push(element);
      });
      this.roles.push(
        {'name': 'Director', value: 'director'},
        {'name': 'Manager',value: 'manager'},
        {'name': 'Supervisor',value: 'superviser'},
        {'name': 'Employee',value: 'employee'}
      )
    } else if(this.isUser == 'director') {
      let data = JSON.parse(localStorage.getItem('department'));
      data.forEach(element => {
        this.departmentsData.push(
          {value: element, department: element}
        );
      });
      this.roles.push(
        {'name': 'Manager',value: 'manager'},
        {'name': 'Supervisor',value: 'superviser'},
        {'name': 'Employee',value: 'employee'}
      )
    } else if(this.isUser == 'manager') {
      this.roles.push(
        {'name': 'Supervisor',value: 'superviser'},
        {'name': 'Employee',value: 'employee'}
      )
    } else if(this.isUser == 'superviser') {
      this.roles.push(
        {'name': 'Employee',value: 'employee'}
      )
    }
    this.sendMsgForm = new FormGroup({
      title: new FormControl('',[Validators.required]),
      message: new FormControl('',[Validators.required]),
      department: new FormControl('All Departments'),
      role: new FormControl('All'),
      type: new FormControl('message')
    })
  }
  sendMessage() {
    this.sendMsgForm.patchValue({
      type: 'message'
    })
    this.spinner.show();
    this.api.post('sendEmergencyMessages', this.sendMsgForm.value).subscribe((data) => {
      this.spinner.hide();
      this.sendMsgForm.reset();
      this.sendMsgForm.patchValue({
        department: 'All Departments'
      })
      this.toast.success('Message Sent Successfully')
    })
  }
}
