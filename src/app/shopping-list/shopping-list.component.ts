import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscribable, Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService} from './shopping-list.service';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],

})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredientArray : Ingredient[] = [];
  private igSubcription:Subscription;
  constructor(private shoppingListService : ShoppingListService) {}

  ngOnInit(): void {
    this.ingredientArray = this.shoppingListService.getIngredients();
    this.igSubcription = this.shoppingListService.newIngredients.subscribe(
      (ings : Ingredient[])=>{
        this.ingredientArray = ings;
      }
    );
  }

   onEditItem(index:number){
       this.shoppingListService.startedEditing.next(index);
   }

   ngOnDestroy(){
     this.igSubcription.unsubscribe();
   }

  // onIngredientAdded(ing: Ingredient) {

  // }
}
