import { ApiService } from './../../../../services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { truncateSync } from 'fs';

@Component({
  selector: 'app-generate-report',
  templateUrl: './generate-report.component.html',
  styleUrls: ['./generate-report.component.css']
})
export class GenerateReportComponent implements OnInit {

  surveys: any;
  questions: any = [];
  dtOptions = {};
  result = false;
  submittedSurvey: any;
  constructor(
    private toast: ToastrService,
    public spinner: NgxSpinnerService,
    public api: ApiService,
    public active: ActivatedRoute
  ) { }

  ngOnInit() {
    this.result = true;
    this.dtOptions = {
      order: [0, 'asc'],
      pageLength: 50
    };
    this.active.params.subscribe((data: any) => {
      if (data.type == 'Other Surveys') {
        this.getOtherSurveys(data.id,data.user);
      } else {
        this.getSurveys(data.id,data.user);
      }
    })
  }
  getSurveys(id,user) {
    this.surveys = null;
    this.submittedSurvey = null;
    this.spinner.show();
    this.api.get('submittedLoginSurveysDetails/'+id+'/'+user).subscribe((data) => {
      this.spinner.hide();
      if (!data.error) {
        this.surveys = data.surveys;
        this.submittedSurvey = data.submittedSurvey;
      }
    })
  }
  getOtherSurveys(id,user) {
    this.surveys = null;
    this.spinner.show();
    this.api.get('submittedOtherSurveysDetails/'+id+'/'+user).subscribe((data) => {
      this.spinner.hide();
      if (!data.error) {
        this.surveys = data.surveys;
        this.questions = data.surveys.survey.question;
        console.log(this.questions)
      }
    })
  }
  printWindow() {
    var printContents = document.getElementById('print-div').innerHTML;
			var originalContents = document.body.innerHTML;
			document.body.innerHTML = printContents;
			window.print();
			document.body.innerHTML = originalContents;
  }
  matchAnswers(q_index) {
      const surveyAnswer = this.surveys[q_index].answer;
      const expectedAnswer = this.surveys[q_index].questions.expected_ans;
      if (surveyAnswer == expectedAnswer) {
        return true;
      } else {
        this.result = false;
        return false;
      }
    }

}
