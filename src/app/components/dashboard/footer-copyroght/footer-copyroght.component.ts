import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit } from '@angular/core';
declare var jQuery:any;

@Component({
  selector: 'app-footer-copyroght',
  templateUrl: './footer-copyroght.component.html',
  styleUrls: ['./footer-copyroght.component.css']
})
export class FooterCopyroghtComponent implements OnInit {
  addFooterForm: FormGroup;
  footer: any;
  constructor(
    private toast: ToastrService,
    public spinner: NgxSpinnerService,
    public api: ApiService,
  ) { }

  ngOnInit() {
    this.initialize();
    this.getFooter();
  }
  initialize() {
    this.addFooterForm = new FormGroup({
      text: new FormControl('', [Validators.required])
    });
  }
  getFooter() {
    this.spinner.show();
    this.api.get('getFooter').subscribe((data) => {
      this.spinner.hide();
      if(!data.error) {
        this.footer = data.footer;
      }
    });
  }
  addFooter() {
    this.spinner.show();
    this.api.post('addFooter', this.addFooterForm.value).subscribe((data) => {
      this.spinner.hide();
      this.addFooterForm.reset();
      jQuery("#addSurveyModal").modal("hide");
      if(!data.error) {
        this.toast.success('Footer added Successfully');
        this.footer = null;
        this.getFooter();
      } else {
        this.toast.error(data.msg)
      }
    });
  }
}
