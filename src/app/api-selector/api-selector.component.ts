import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-api-selector',
  templateUrl: './api-selector.component.html',
  styleUrls: ['./api-selector.component.scss']
})
export class ApiSelectorComponent implements OnInit {
  apiUrl: string;
  constructor(private router: Router){}
  ngOnInit(){}

  public navigateToMainPage() {
    this.router.navigateByUrl('/main?apiUrl=' + this.apiUrl);
  }
}
