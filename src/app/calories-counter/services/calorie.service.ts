import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Meal } from '../models/meal.model';

@Injectable({
  providedIn: 'root'
})
export class CalorieService {
  private meals: Meal[] = [];
  private mealsSubject = new BehaviorSubject<Meal[]>(this.meals);

  constructor() {}

  // Log a meal
  logMeal(meal: Meal): void {
    this.meals.push(meal);
    this.mealsSubject.next(this.meals);
  }

  // Get all meals
  getMeals(): Observable<Meal[]> {
    return this.mealsSubject.asObservable();
  }

  // Get meals for a specific date
  getMealsByDate(date: Date): Meal[] {
    return this.meals.filter(meal => {
      return meal.date.toDateString() === date.toDateString();
    });
  }

  // Calculate total calories for a specific date
  getTotalCaloriesByDate(date: Date): number {
    const meals = this.getMealsByDate(date);
    return meals.reduce((total, meal) => total + meal.calories, 0);
  }

  // Calculate weekly calories
  getWeeklyCalories(): { date: Date; totalCalories: number }[] {
    const weeklyData = [];
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startOfWeek);
      currentDate.setDate(startOfWeek.getDate() + i);
      const totalCalories = this.getTotalCaloriesByDate(currentDate);
      weeklyData.push({ date: currentDate, totalCalories });
    }

    return weeklyData;
  }
}
