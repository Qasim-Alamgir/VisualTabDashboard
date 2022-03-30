import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from 'src/app/services/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
declare var jQuery:any;
@Component({
  selector: 'app-manage-admins',
  templateUrl: './manage-admins.component.html',
  styleUrls: ['./manage-admins.component.css']
})
export class ManageAdminsComponent implements OnInit {
  dtOptions: any = {};

  admins: any;
  addAdminForm: FormGroup;
  updateAdminForm: FormGroup;
  delId = '';
  checkUpdate = false;
  constructor(
    private toast: ToastrService,
    public spinner: NgxSpinnerService,
    public api: ApiService
  ) { }

  ngOnInit() {
    this.initialize();
    this.getAdmins();
  }
  initialize() {
    this.dtOptions = {
      order : [0, 'desc'],
    };
    this.addAdminForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      user_type: new FormControl('admin'),
      id: new FormControl(''),
    })
  }

  addNewAdmin() {
    this.addAdminForm.patchValue({
      user_type: 'admin'
    })
    this.spinner.show();
    this.api.post('addNewAdmin', this.addAdminForm.value).subscribe((data) => {
      this.spinner.hide();
      if(data.error) {
        this.toast.warning(data.msg);
      } else {
        this.addAdminForm.reset();
        this.addAdminForm.patchValue({
          user_type: 'admin'
        });
        jQuery("#addModal").modal("hide");
        this.admins = null;
        this.getAdmins();
        this.toast.success(data.msg);
      }
    })
  }
  getAdmins() {
    this.spinner.show();
    this.api.get('getAdmins').subscribe((data) => {
      this.spinner.hide();
      if (data.error) {
        this.toast.error(data.msg);
      } else {
        this.admins = data.data;
      }
    })
  }
  deleteModal(id) {
    this.delId = id;
    jQuery("#deleteModal").modal("show");
  }
  deleteUser() {
    this.spinner.show();
    this.api.get('deleteAdmins/' + this.delId).subscribe((data) => {
      this.spinner.hide();
      jQuery("#deleteModal").modal("hide");

      if(!data.error) {
        this.toast.success(data.msg);
        this.admins = null;
        this.getAdmins();
      } else {
        this.toast.error(data.msg)
      }
    })
  }
  updateAdmins(index) {
    this.addAdminForm.patchValue({
      name: this.admins[index].name,
      email: this.admins[index].email,
      id: this.admins[index].id
    });
    jQuery("#editModal").modal("show");

  }
  onUpdateAdmin() {
    this.spinner.show();
    this.api.post('updateAdmin', this.addAdminForm.value).subscribe((data) => {
      this.spinner.hide();
      if(data.error) {
        this.toast.warning(data.msg);
      } else {
        this.addAdminForm.reset();
        this.addAdminForm.patchValue({
          user_type: 'admin'
        });
        this.admins = null;
        jQuery("#editModal").modal("hide");

        this.getAdmins();
        this.toast.success(data.msg);
      }
    })
  }
  addNew() {
    this.addAdminForm.reset();
    this.addAdminForm.patchValue({
      user_type: 'admin'
    });
    jQuery("#addModal").modal("show");
  }
}
