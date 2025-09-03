import { Component } from '@angular/core';
import { MealService } from '../services/meal.service';

@Component({
  selector: 'app-meal-scheduler',
  templateUrl: './meal-scheduler.component.html',
  styleUrls: ['./meal-scheduler.component.scss']
})
export class MealSchedulerComponent {
  meals: any[] = [];

  constructor(private mealService: MealService) {
    this.meals = this.mealService.getMeals();
  }
}
