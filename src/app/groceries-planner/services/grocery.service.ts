import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GroceryItem } from '../models/grocery-item.model';

@Injectable({
providedIn: 'root'
})
export class GroceryService {
private groceryItems: GroceryItem[] = [];
private groceryItemsSubject = new BehaviorSubject<GroceryItem[]>(this.groceryItems);

constructor() {}

  // Add a grocery item
  addGroceryItem(item: GroceryItem): void {
    this.groceryItems.push(item);
    this.groceryItemsSubject.next(this.groceryItems);
  }

  // Get all grocery items
  getGroceryItems(): Observable<GroceryItem[]> {
    return this.groceryItemsSubject.asObservable();
  }

  // Generate a shopping list based on scheduled meals
  generateShoppingList(scheduledMeals: { date: Date; recipe: { ingredients: string[] } }[]): GroceryItem[] {
    const shoppingList: GroceryItem[] = [];
    const ingredientCount: { [key: string]: number } = {};

    scheduledMeals.forEach(meal => {
      meal.recipe.ingredients.forEach(ingredient => {
        if (ingredientCount[ingredient]) {
          ingredientCount[ingredient]++;
        } else {
          ingredientCount[ingredient] = 1;
        }
      });
    });

    for (const ingredient in ingredientCount) {
      shoppingList.push({ name: ingredient, quantity: ingredientCount[ingredient], category: 'General' });
    }

    return shoppingList;
  }

  // Remove a grocery item
  removeGroceryItem(item: GroceryItem): void {
    this.groceryItems = this.groceryItems.filter(groceryItem => groceryItem.name !== item.name);
    this.groceryItemsSubject.next(this.groceryItems);
  }
}
