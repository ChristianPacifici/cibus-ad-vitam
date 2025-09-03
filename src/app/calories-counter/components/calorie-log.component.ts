import { Component } from '@angular/core';
import { CalorieService } from '../services/calorie.service';

@Component({
  selector: 'app-calorie-log',
  templateUrl: './calorie-log.component.html',
  styleUrls: ['./calorie-log.component.scss']
})
export class CalorieLogComponent {
  mealName: string = '';
  calories: number = 0;

  constructor(private calorieService: CalorieService) {}

  logMeal() {
    this.calorieService.logMeal({ name: this.mealName, calories: this.calories, date: new Date() });
    this.mealName = '';
    this.calories = 0;
  }
}
