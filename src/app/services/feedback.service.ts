import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map, catchError} from 'rxjs/operators';
import { Feedback } from '../shared/feedback'
import { baseURL } from '../shared/baseurl';

import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private httpClient: HttpClient, private processHTTPMsgService: ProcessHTTPMsgService) { }

  postFeedback(feedback: Feedback): Observable<Feedback> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.httpClient.post<Feedback>(baseURL + 'feedback/', feedback, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));

  }
}
