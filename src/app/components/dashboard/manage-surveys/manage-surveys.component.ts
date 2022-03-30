import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/services/api.service';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
declare var jQuery:any;

@Component({
  selector: 'app-manage-surveys',
  templateUrl: './manage-surveys.component.html',
  styleUrls: ['./manage-surveys.component.css']
})
export class ManageSurveysComponent implements OnInit {
  @ViewChild('topScrollAnchor', {static: false}) topScroll: ElementRef;
  surveyId = '';
  dtOptions: any = {};
  surveys: any = null;
  questions: any = null;
  addQuestionsForm: FormGroup;
  updateQuestionsForm: FormGroup;
  addSurveyForm: FormGroup;
  updateSurveyForm: FormGroup;
  formData = new FormData;
  delId = '';
  checkQuestion = false;
  isUser: string;

  productForm: any;
  departments = [
    {'value': 'All Departments', department: 'All Departments'}
  ]
  roles = [
    {'name': 'Send To All', value: 'Send To All'},
    {'name': 'Director', value: 'director'},
    {'name': 'Manager',value: 'mangaer'},
    {'name': 'Supervisor',value: 'superviser'},
    {'name': 'HR',value: 'Hr'},
    {'name': 'Employee',value: 'employee'}
  ]
  pushSurveyForm: FormGroup;
  questionsAnswer: any;
  delIndex: any;
  constructor(
    private toast: ToastrService,
    public spinner: NgxSpinnerService,
    public api: ApiService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.productForm = this.fb.group({
      quantities: this.fb.array([]),
      survey: new FormControl('')
    });
    // for (let i=0; i<5;i++) {
    //   this.quantities().push(this.newQuantity());
    //   this.answers(i).push(this.newAnswers());
    // }
  }

  ngOnInit() {
    let depart = JSON.parse(localStorage.getItem('departments'));
    depart.forEach(element => {
      this.departments.push({
        value: element.value, department: element.department
      })
    });
    console.log(this.departments)
    this.dtOptions = {
      order : [0, 'desc'],
    };
    this.isUser = this.authService.getCurrentUserType();
    this.initialize();
    this.getSurveys(false);
    // this.getQuestions();
  }
  quantities() : FormArray {
    return this.productForm.get("quantities") as FormArray
  }

  newQuantity(): FormGroup {
    return this.fb.group({
      question: new FormControl('', [Validators.required]),
      expected_ans: new FormControl('No'),
    })
  }
  newAnswers(): FormGroup {
    return this.fb.group({
      answer: new FormControl('', [Validators.required]),
    })
  }
  answers(j) : FormArray{
    console.log(j);
    return this.productForm.get('quantities').controls[j].get('answers') as FormArray
  }
  addAnswer(j) {
    this.answers(j).push(this.newAnswers());
  }
  removeAnswerAt(i,j) {
    this.answers(i).removeAt(j);
  }

  addQuantity() {
    this.quantities().push(this.newQuantity());

  }

  removeQuantity(i:number) {
    this.quantities().removeAt(i);
  }

  onSubmit() {
    console.log(this.productForm.value);
    this.spinner.show();
    this.api.post('addNewQuestion', this.productForm.value).subscribe((data) => {
      this.spinner.hide();
      this.productForm.reset();
      // this.productForm.patchValue({
      //   survey: '',
      //   quantities: this.fb.array([]),
      // });
      if(!data.error) {
        jQuery("#addQuestionModal").modal("hide");
        this.toast.success('Question Updated Successfully');
        this.questions = null;
        this.getSurveys(true);
      } else {
        this.toast.error(data.msg)
      }
    });
  }
  initialize() {
    this.pushSurveyForm = new FormGroup({
      department: new FormControl('All Departments',[Validators.required]),
      role: new FormControl('Send To All',[Validators.required])
    })
    this.addSurveyForm = new FormGroup({
      name: new FormControl('', [Validators.required])
    })
    this.updateSurveyForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      id: new FormControl(''),
    })
    this.addQuestionsForm = new FormGroup({
      question: new FormControl('', [Validators.required]),
      expected_ans: new FormControl('', [Validators.required]),
      survey: new FormControl('', [Validators.required])
    })
    this.updateQuestionsForm = new FormGroup({
      question: new FormControl('', [Validators.required]),
      expected_ans: new FormControl('', [Validators.required]),
      id: new FormControl(''),
      survey: new FormControl('', [Validators.required])
    })
  }
  getSurveys(check) {
    this.spinner.show();
    this.api.get('getSurveys').subscribe((data) => {
      this.spinner.hide();
      if(!data.error) {
        this.surveys = data.survey;
        if(check) {
          this.getQuestionsFromSurvey(this.surveyId);
        }
        console.log(this.surveys)
      } else {
        this.toast.error(data.msg)
      }
    });
  }
  addSurvey() {
    this.spinner.show();
    this.api.post('createSurvey', this.addSurveyForm.value).subscribe((data) => {
      this.spinner.hide();
      this.addSurveyForm.reset();
      jQuery("#addSurveyModal").modal("hide");
      if(!data.error) {
        this.toast.success('Survey added Successfully');
        this.surveys = null;
        this.getSurveys(false);
      } else {
        this.toast.error(data.msg)
      }
    });
  }
  deleteModal(id) {
    this.delId = id;
    jQuery("#deleteModal").modal("show");
  }
  deleteUser() {
    this.spinner.show();
    this.api.get('deleteSurveys/' + this.delId).subscribe((data) => {
      this.spinner.hide();
      jQuery("#deleteModal").modal("hide");

      if(!data.error) {
        this.toast.success(data.msg);
        this.surveys = null;
        this.getSurveys(false);
      } else {
        this.toast.error(data.msg)
      }
    })
  }
  openUpdateModal(survey) {
    this.updateSurveyForm.patchValue({
      name: survey.name,
      id: survey.id
    })
    jQuery("#updateSurveyModal").modal("show");
  }
  updateUser() {
    this.spinner.show();
    this.api.post('updateSurveys', this.updateSurveyForm.value).subscribe((data) => {
      console.log(data);
      this.spinner.hide();
      this.formData = new FormData;
      this.updateSurveyForm.reset();
      jQuery("#updateSurveyModal").modal("hide");
      if(!data.error) {
        this.toast.success('Survey updated Successfully');
        this.surveys = null;
        this.getSurveys(false);
      } else {
        this.toast.error(data.msg)
      }
    });
  }
  getQuestions() {
    this.questions = null;
    // this.spinner.show();
    // this.api.get('getQuestion').subscribe((data) => {
    //   this.spinner.hide();
    //   if(!data.error) {
    //     this.questions = data.question;
    //   } else {
    //     this.toast.error(data.msg)
    //   }
    // });
  }
  questionModal() {
    this.productForm = this.fb.group({
      quantities: this.fb.array([]),
      survey: this.surveys[this.surveyId].id
    });
    this.addQuestionsForm.reset();
    this.addQuestionsForm.patchValue({
      survey: this.surveys[this.surveyId].id
    })
    this.quantities().push(this.newQuantity());
    jQuery("#addQuestionModal").modal("show");
  }
  addQuestion() {
    this.spinner.show();
    this.api.post('addNewQuestion', this.addQuestionsForm.value).subscribe((data) => {
      this.spinner.hide();
      if(!data.error) {
        jQuery("#addQuestionModal").modal("hide");
        this.toast.success('Question added Successfully');
        this.questions = null;
        this.getSurveys(true);
      } else {
        this.toast.error(data.msg)
      }
    });
  }
  deleteQuestionModal(id,index) {
    this.delId = id;
    this.delIndex = index;
    jQuery("#deleteQuestionModal").modal("show");
  }
  deleteQuestion() {
    this.spinner.show();
    this.api.get('deleteQuestion/' + this.delId).subscribe((data) => {
      this.spinner.hide();
      jQuery("#deleteQuestionModal").modal("hide");

      if(!data.error) {
        this.toast.success(data.msg);
        this.questions.question.splice(this.delIndex, 1);
        // this.getQuestions();
      } else {
        this.toast.error(data.msg)
      }
    })
  }

  openUpdateQuestionModal(question) {
    jQuery("#updateQuestionModal").modal("show");
    this.updateQuestionsForm.patchValue({
      question: question.question,
      expected_ans: question.expected_ans,
      id: question.id,
      survey: question.survey_id
    })
  }
  updateQuestion() {
    this.spinner.show();
    this.api.post('updateQuestion', this.updateQuestionsForm.value).subscribe((data) => {
      this.spinner.hide();
      this.updateQuestionsForm.reset();
      if(!data.error) {
        jQuery("#updateQuestionModal").modal("hide");
        this.toast.success('Question updated Successfully');
        this.questions = null;
        this.getSurveys(true);
      } else {
        this.toast.error(data.msg)
      }
    });
  }
  pushSurveyToAllUsers(id) {
    this.spinner.show();
    const params = {
      surveyId: id,
      department: this.pushSurveyForm.get('department').value,
      role: this.pushSurveyForm.get('role').value
    }
    this.api.post('pushSurveyToAllUsers', params).subscribe((data) => {
      this.spinner.hide();
      if(!data.error) {
        this.toast.success(data.msg);
      } else {
        this.toast.error(data.msg)
      }
    });
  }
  getQuestionsFromSurvey(index) {
    this.surveyId = index;
    this.questions = null;
    this.questions = this.surveys[index];
    console.log(this.questions)
    setTimeout(() => {
      this.topScroll.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  }
}
