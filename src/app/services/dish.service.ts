import { Injectable } from '@angular/core';
import {Dish} from '../shared/dish';
import { Dishes } from '../shared/dishes';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { baseURL } from '../shared/baseurl';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private httpClient: HttpClient) { }

  getDishIds() : Observable<string[]>{
    //return of(Dishes.map((dish) => dish.id));

  return this.httpClient.get<Dish[]>(baseURL + 'dishes').pipe(map(dishes => dishes.map(dish => dish.id)));
  }

  getDishes(): Observable<Dish[]>{
    // return of(Dishes).pipe(delay(2000));
    return this.httpClient.get<Dish[]>(baseURL + 'dishes');
    // return new Promise (resolve => {
    //   setTimeout(() => resolve(Dishes), 2000)
    // } ) ;
  }

  getDish(id): Observable<Dish>{
    //return of (Dishes.filter((dish) => dish.id === id)[0]).pipe(delay(2000));
    return this.httpClient.get<Dish>(baseURL + 'dishes/' + id);
    // return new Promise (resolve =>{
    //   setTimeout(() => resolve(Dishes.filter((dish) => dish.id === id)[0]), 2000)
    // });
    
    
  }

  getFeaturedDish(): Observable<Dish>{
    //return of(Dishes.filter((dish) => dish.featured == true)[0]).pipe(delay(2000));
    return this.httpClient.get<Dish>(baseURL + 'dishes?featured=true').pipe(map(dishes => dishes[0]));
  // return new Promise ( resolve =>{
  //   setTimeout(() => resolve(Dishes.filter((dish) => dish.featured == true)[0]),2000)
  // }) 
  }
}
