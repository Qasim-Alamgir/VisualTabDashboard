import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  footer: any;
  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
    this.getFooter();
  }
  getFooter() {
    this.api.get('getFooter').subscribe((data) => {
      if(!data.error) {
        this.footer = data.footer;
      }
    });
  }

}
