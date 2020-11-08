import { Component, Input, OnInit } from '@angular/core';
import {Dish} from '../shared/dish';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';
import {DishService} from '../services/dish.service';

@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.scss']
})
export class DishDetailComponent implements OnInit {

  dish: Dish;

  constructor(private route: ActivatedRoute, private location: Location,
    private dishService: DishService) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    this.dishService.getDish(id)
      .then((dish) => this.dish = dish);
  }

  goBack (): void {
    this.location.back();
  }

}
