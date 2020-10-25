import { Injectable } from '@angular/core';
import {Promotion} from '../shared/promotion';
import {Promotions} from '../shared/promotions';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }

  getPromotions(): Promotion[]{
    return Promotions;
  }

  getPromotion(id): Promotion{
    return Promotions.filter((promotion) => promotion.id === id)[0];
  }

  getFeaturedPromotion(): Promotion{
  return Promotions.filter((promotion) => promotion.featured == true)[0];
  }
}
