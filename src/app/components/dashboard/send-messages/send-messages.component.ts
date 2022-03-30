import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from './../../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { emptyScheduled } from 'rxjs/internal/observable/empty';

@Component({
  selector: 'app-send-messages',
  templateUrl: './send-messages.component.html',
  styleUrls: ['./send-messages.component.css']
})
export class SendMessagesComponent implements OnInit {
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
      type: new FormControl('emergency')
    })
  }
  sendMessage() {
    this.sendMsgForm.patchValue({
      type: 'emergency'
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
