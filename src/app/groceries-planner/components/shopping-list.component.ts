// shopping-list.component.ts
import { Component } from '@angular/core';
import { GroceryService } from '../services/grocery.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent {
  groceryItems: any[] = [];

  constructor(private groceryService: GroceryService) {
    this.groceryItems = this.groceryService.getGroceryItems();
  }
}
