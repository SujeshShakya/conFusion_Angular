import { Injectable } from '@angular/core';
import {Dish} from '../shared/dish';
import { Dishes } from '../shared/dishes';


@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishes(): Promise<Dish[]>{
    return new Promise (resolve => {
      setTimeout(() => resolve(Dishes), 2000)
    } ) ;
  }

  getDish(id): Promise<Dish>{
    return new Promise (resolve =>{
      setTimeout(() => resolve(Dishes.filter((dish) => dish.id === id)[0]), 2000)
    });
    
    
  }

  getFeaturedDish(): Promise<Dish>{
  return new Promise ( resolve =>{
    setTimeout(() => resolve(Dishes.filter((dish) => dish.featured == true)[0]),2000)
  }) 
  }
}
