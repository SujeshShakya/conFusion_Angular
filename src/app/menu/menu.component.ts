import { Component, OnInit } from '@angular/core';
import {Dish} from '../shared/dish';
import {Dishes} from '../shared/dishes';

const DISHES: Dish[] = Dishes;

 
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {

dishes = DISHES;

selectedDish: Dish;

  constructor() { }

  ngOnInit() {
  }

  Selectdish(dish: Dish){
    this.selectedDish = dish;
  }

}
