import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from 'src/app/services/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
declare var jQuery:any;

@Component({
  selector: 'app-management-users',
  templateUrl: './management-users.component.html',
  styleUrls: ['./management-users.component.css']
})
export class ManagementUsersComponent implements OnInit {
  customers: any;
  customerStatusForm: FormGroup;
  addCustomerForm: FormGroup;
  updateCustomerForm: FormGroup;
  formData = new FormData;
  delId = '';
  checkUpdate = false;
  dtOptions: any = {};
  passId = '';
  userType = this.authService.getCurrentUserType();
  department = localStorage.getItem('department');
  messageID: ''
  messageForm: FormGroup;
  jobs = [
    {'name' : 'part','value': 'Part Time'},
    {'name' : 'full','value': 'Full Time'},
  ]
  departments = [
    {'name': 'HR', value: 'hr'},
    {'name': 'RECREATION', value: 'recreation'},
    {'name': 'FIN & ADMIN', value: 'finance'},
    {'name': 'BUILDING SERVICES', value: 'building'},
    {'name': 'LEASING + MARKETING', value: 'marketing'},
    {'name': 'MAINTENANCE',value: 'maintenance'},
    {'name': 'EXECUTIVE TEAM', value: 'executive'}
  ]
  deparmentsData = JSON.parse(localStorage.getItem('departments'));
  userProfile: any;
  directersDepartment: any;

  constructor(
    private toast: ToastrService,
    public spinner: NgxSpinnerService,
    public api: ApiService,
    private authService: AuthService,

  ) { }

  ngOnInit() {
    this.dtOptions = {
      order : [0, 'desc'],
    };

    this.initialize();
    this.getUserProfile();
    this.getAppUsers();
  }
  initialize() {
    this.addCustomerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      department: new FormControl('', [Validators.required]),
      udid: new FormControl(''),
      job: new FormControl('', [Validators.required]),
      user_type: new FormControl('employee'),
    })
    this.updateCustomerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      department: new FormControl('', [Validators.required]),
      udid: new FormControl(''),
      job: new FormControl(''),
      id: new FormControl(''),
      user_type: new FormControl()
    })
    this.addCustomerForm.patchValue({
      user_type: 'employee'
    })
    this.messageForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      message: new FormControl('', [Validators.required]),
      employeeId: new FormControl('', [Validators.required]),
    })
  }
  getUserProfile() {
    this.authService.profileUser().subscribe(data => {
      this.userProfile = data.user;
      this.directersDepartment = JSON.parse(this.userProfile.department)
    })
  }
  addNewEmployee() {
    this.spinner.show();
    this.api.post('addEmployee', this.addCustomerForm.value).subscribe((data) => {
      this.spinner.hide();
      if(data.error) {
        this.toast.warning(data.msg);
      } else {
        this.addCustomerForm.reset();
        this.addCustomerForm.patchValue({
          user_type: 'employee'
        });
        jQuery("#addModal").modal("hide");
        this.customers = null;
        this.getAppUsers();
        this.toast.success(data.msg);
      }
    })
  }
  getAppUsers() {
    this.spinner.show();
    this.api.get('getEmployees/'+this.userType).subscribe((data) => {
      console.log(data);
      this.spinner.hide();
      if (data.error) {
        this.toast.error(data.msg);
      } else {
        this.customers = data.employees;
      }
    })
  }
  deleteModal(id) {
    this.delId = id;
    jQuery("#deleteModal").modal("show");
  }
  deleteUser() {
    this.spinner.show();
    this.api.get('delEmployee/' + this.delId).subscribe((data) => {
      this.spinner.hide();
      jQuery("#deleteModal").modal("hide");

      if(!data.error) {
        this.toast.success(data.msg);
        this.customers = null;
        this.getAppUsers();
      } else {
        this.toast.error(data.msg)
      }
    })
  }

  updateAdmins(index) {
    this.department = this.customers[index].department;

    this.updateCustomerForm.patchValue({
      name: this.customers[index].name,
      email: this.customers[index].email,
      department: this.customers[index].department,
      job: this.customers[index].job_time,
      id: this.customers[index].id,
      udid: this.customers[index].udid,
      user_type: this.customers[index].user_type
    });
    jQuery("#editModal").modal("show");
  }
  onUpdateAdmin() {
    this.spinner.show();
    this.api.post('updateEmployee', this.updateCustomerForm.value).subscribe((data) => {
      this.spinner.hide();
      if(data.error) {
        this.toast.warning(data.msg);
      } else {
        this.updateCustomerForm.reset();
        this.customers = null;
        jQuery("#editModal").modal("hide");

        this.getAppUsers();
        this.checkUpdate = false;
        this.toast.success(data.msg);
      }
    })
  }
  updatePasswordModal(id) {
    this.passId = id;
    jQuery("#passwordModals").modal("show");
  }
  updatePassord() {
    this.spinner.show();
    this.api.get('updateEmployeePassword/' + this.passId).subscribe((data) => {
      this.spinner.hide();
      jQuery("#passwordModals").modal("hide");
      if(!data.error) {
        this.toast.success(data.msg);
      } else {
        this.toast.error(data.msg)
      }
    })
  }
  openMessageModal(id) {
    this.messageID = id
    this.messageForm.patchValue({
      employeeId: id
    })
    jQuery("#directMessages").modal("show");
  }
  senddirectMessage() {
    this.spinner.show();
    this.api.post('sendDirectMessage',this.messageForm.value).subscribe((data) => {
      this.spinner.hide();
      jQuery("#directMessages").modal("hide");
      if(!data.error) {
        this.messageForm.reset();
        this.toast.success(data.msg);
      } else {
        this.toast.error(data.msg)
      }
    })
  }
  addNew() {
    this.addCustomerForm.reset();
    this.addCustomerForm.patchValue({
      user_type: 'employee'
    });
    jQuery("#addModal").modal("show");
  }
}
