import { Component, createPlatformFactory, Input, OnInit, ViewChild } from '@angular/core';
import {Dish} from '../shared/dish';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';
import {DishService} from '../services/dish.service';
import { switchMap } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';

import { ProcessHTTPMsgService } from '../services/process-httpmsg.service';


@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.scss']
})
export class DishDetailComponent implements OnInit {

  @ViewChild('cform') commentFormDirective;

  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;
  commentForm: FormGroup;
  comment: Comment;
  errMess: string;

  dishcopy: Dish;

  formErrors = {
    'author': '',
    'rating': 0,
    'comment': '',
  };

  validationMessages = {
    'author': {
      'required':      'Author is required.',
      'minlength':     'Author must be at least 2 characters long.',
    },
    'rating': {
    },
    'comment': {
      'required':      'Comment is required.',
    }
  };

  constructor(private route: ActivatedRoute, private location: Location,
    private dishService: DishService, private fb: FormBuilder, private processHTTPMsgService: ProcessHTTPMsgService) {
      this.createForm();
     }

  ngOnInit() {
    this.dishService.getDishIds().subscribe((dishIds) => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => this.dishService.getDish(params['id'])))
    .subscribe((dish) => { this.dish = dish; this.dishcopy = dish ; this.setPrevNext(dish.id);}, errmess => this.errMess = <any>errmess);
  }

  createForm(){
    this.commentForm = this.fb.group({
      author:['',[Validators.required, Validators.minLength(2)]],
      rating:[5],
      comment:['',[Validators.required]]
    })

    this.commentForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

  this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit(){
    this.comment = this.commentForm.value;
    this.comment.date = Date.now().toString();
    console.log(this.comment);
    this.commentForm.reset({
      author: '',
      rating: [5],
      comment: '',
    });

    // this.commentFormDirective.resetForm();
    this.dish.comments.push(
      this.comment
    )
    this.dishService.putDish(this.dishcopy)
    .subscribe(dish => {
      this.dish = dish; this.dishcopy = dish;
    },
    errmess => { this.dish = null; this.dishcopy = null; this.errMess = <any>errmess; });
    
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
