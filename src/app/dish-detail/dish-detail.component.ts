import { Component, Input, OnInit } from '@angular/core';
import {Dish} from '../shared/dish';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';
import {DishService} from '../services/dish.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.scss']
})
export class DishDetailComponent implements OnInit {

  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;

  constructor(private route: ActivatedRoute, private location: Location,
    private dishService: DishService) { }

  ngOnInit() {
    this.dishService.getDishIds().subscribe((dishIds) => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => this.dishService.getDish(params['id'])))
    .subscribe((dish) => { this.dish = dish; this.setPrevNext(dish.id);});
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack (): void {
    this.location.back();
  }

}
