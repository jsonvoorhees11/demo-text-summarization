import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SummaryRequest } from './models/summary-request.model';
import Summary from './models/summary.model';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import Section from './models/section.model';

@Injectable({
  providedIn: 'root'
})
export class SummarizationService {

  constructor(private http: HttpClient) { }

  summary(baseUrl: string, request: SummaryRequest): Observable<Summary> {
    const endpoint = '/summarize';
    const apiEndpoint = baseUrl + endpoint;
    return this.http
        .post<Summary>(apiEndpoint, request)
        .pipe(
          tap((sum: Summary) => console.log('success!')),
          catchError(this.handleError<Summary>('summary'))
        );
  }

  random(baseUrl: string): Observable<SummaryRequest> {
    const endpoint = '/random';
    const apiEndpoint = baseUrl + endpoint;
    return this.http
        .get<SummaryRequest>(apiEndpoint)
        .pipe(
          catchError(this.handleError<SummaryRequest>('random'))
        );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
