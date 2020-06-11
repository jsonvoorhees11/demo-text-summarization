import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import Section from '../models/section.model';
import { faTimesCircle, faWindowClose } from '@fortawesome/free-regular-svg-icons';
import { ModalService } from '../modal/modal.service';
import { ActivatedRoute } from '@angular/router';
import Summary from '../models/summary.model';
import { SummaryRequest } from '../models/summary-request.model';
import { catchError, map, tap } from 'rxjs/operators';
import { throwError, Subject } from 'rxjs';
import { SummarizationService } from '../summarization.service';
import { indicate } from '../operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  removeIcon = faTimesCircle;
  closeIcon = faWindowClose;

  loading$ = new Subject<boolean>()

  sections: Section[];
  selectedSection: Section;
  bodyText: string;
  summarizedContent: string;
  baseUrl: string;

  constructor(
    private route: ActivatedRoute,
    private modalService: ModalService,
    private http: HttpClient,
    private sumService: SummarizationService
  ) {
    this.route.queryParams.subscribe(params => {
      this.baseUrl = params['apiUrl'];
    });
  }
  ngOnInit() {
    this.sections = [
      new Section(
        'beginning',
        `beginning`
      )
    ];
    this.selectedSection = this.sections[0];
    this.bodyText = 'ABC';
  }

  public addSection() {
    this.sections.push(new Section('new section', `new section.`));
  }

  public removeSection(name: string) {
    this.sections.forEach((v, i) => {
      if (v.name === name) {
        this.sections.splice(i, 1);
      }
    });
  }

  public selectSection(name: string) {
    this.selectedSection = this.sections.find(x => x.name === name);
  }

  public randomSections() {
    if (!this.baseUrl || !this.baseUrl.length) {
      return;
    }

    this.sumService
      .random(this.baseUrl)
      .pipe(indicate(this.loading$))
      .subscribe(randSections => {
        this.sections = [];
        const length = randSections.section_names.length > randSections.sections.length
          ? randSections.sections.length : randSections.section_names.length;
        for (let i = 0; i < length; i++) {
          this.sections.push(new Section(randSections.section_names[i], randSections.sections[i]));
        }
        if (this.sections && this.sections.length > 0) {
          this.selectedSection = this.sections[0];
        }
      });
  }

  public summarize(modalId: string = '') {
    if (this.baseUrl.length > 0) {
      const request = new SummaryRequest(this.sections.map(x => x.name), this.sections.map(x => x.content));
      this.sumService
        .summary(this.baseUrl, request)
        .pipe(indicate(this.loading$))
        .subscribe(summary => this.summarizedContent = summary.summary);
    }
    if (modalId !== '') {
      this.closeModal(modalId);
    }
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
