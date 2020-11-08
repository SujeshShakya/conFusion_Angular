import { Injectable } from '@angular/core';
import {Dish} from '../shared/dish';
import { Dishes } from '../shared/dishes';


@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishes(): Promise<Dish[]>{
    return Promise.resolve(Dishes) ;
  }

  getDish(id): Promise<Dish>{
    return  Promise.resolve(Dishes.filter((dish) => dish.id === id)[0]);
  }

  getFeaturedDish(): Promise<Dish>{
  return Promise.resolve(Dishes.filter((dish) => dish.featured == true)[0]);
  }
}
