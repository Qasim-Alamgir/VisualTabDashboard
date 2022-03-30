import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/services/api.service';
declare var jQuery:any;

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {
  departments: any;
  addDepartmentForm: FormGroup;
  constructor(
    private api: ApiService,
    public spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.addDepartmentForm = new FormGroup({
      department: new FormControl('',Validators.required)
    })
    this.getDepartments();
  }
  getDepartments() {
    this.departments = null;
    this.spinner.show();
    localStorage.removeItem('departments')
    this.api.get('getDepartments',null).subscribe(res => {
      this.departments = res.departments;
      localStorage.setItem('departments', JSON.stringify(res.departments));
      this.spinner.hide();
    })
  }
  addDepartment() {
    this.spinner.show();
    this.api.post('addDepartment',this.addDepartmentForm.value).subscribe(res => {
      this.spinner.hide();
      this.addDepartmentForm.reset();
      jQuery("#adddeparmentModal").modal("hide");
      this.getDepartments();
    })
  }

}
