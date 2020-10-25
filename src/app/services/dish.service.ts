import { Injectable } from '@angular/core';
import {Dish} from '../shared/dish';
import { Dishes } from '../shared/dishes';


@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishes(): Dish[]{
    return Dishes;
  }

  getDish(id): Dish{
    return Dishes.filter((dish) => dish.id === id)[0];
  }

  getFeaturedDish(): Dish{
  return Dishes.filter((dish) => dish.featured == true)[0];
  }
}
