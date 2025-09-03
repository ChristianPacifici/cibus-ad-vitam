import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Recipe } from '../models/recipe.model';

@Injectable({
providedIn: 'root'
})
export class MealService {
private recipes: Recipe[] = [];
private scheduledMeals: { date: Date; recipe: Recipe }[] = [];
private recipesSubject = new BehaviorSubject<Recipe[]>(this.recipes);
private scheduledMealsSubject = new BehaviorSubject<{ date: Date; recipe: Recipe }[]>(this.scheduledMeals);

constructor() {}

  // Add a recipe
  addRecipe(recipe: Recipe): void {
    this.recipes.push(recipe);
    this.recipesSubject.next(this.recipes);
  }

  // Get all recipes
  getRecipes(): Observable<Recipe[]> {
    return this.recipesSubject.asObservable();
  }

  // Schedule a meal
  scheduleMeal(date: Date, recipe: Recipe): void {
    this.scheduledMeals.push({ date, recipe });
    this.scheduledMealsSubject.next(this.scheduledMeals);
  }

  // Get scheduled meals
  getScheduledMeals(): Observable<{ date: Date; recipe: Recipe }[]> {
    return this.scheduledMealsSubject.asObservable();
  }

  // Get scheduled meals for a specific date
  getScheduledMealsByDate(date: Date): { date: Date; recipe: Recipe }[] {
    return this.scheduledMeals.filter(meal => {
      return meal.date.toDateString() === date.toDateString();
    });
  }
}
