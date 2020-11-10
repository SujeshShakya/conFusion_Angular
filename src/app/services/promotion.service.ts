import { Injectable } from '@angular/core';
import {Promotion} from '../shared/promotion';
import {Promotions} from '../shared/promotions';

import { baseURL } from '../shared/baseurl';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { ProcessHTTPMsgService } from '../services/process-httpmsg.service';


@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: HttpClient,private processHTTPMsgService: ProcessHTTPMsgService) { }

  getPromotions(): Observable<Promotion[]>{
    return this.http.get<Promotion[]>(baseURL + '/promotions').pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getPromotion(id): Observable<Promotion>{
    return this.http.get<Promotion>(baseURL + '/promotions/' +id).pipe(catchError(this.processHTTPMsgService.handleError));
    //Promotions.filter((promotion) => promotion.id === id)[0];
  }

  getFeaturedPromotion(): Observable<Promotion>{
  return this.http.get<Promotion>(baseURL + 'promotions?featured=true').pipe(map(promotion => promotion[0])).pipe(catchError(this.processHTTPMsgService.handleError));
  //Promotions.filter((promotion) => promotion.featured == true)[0];
  }
}
