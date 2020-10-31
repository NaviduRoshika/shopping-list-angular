import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model'
export class ShoppingListService{

    newIngredients = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();
    private ingredientArray: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 8),
      ];

    getIngredients(){
        return this.ingredientArray.slice()
    }

    getIngredient(index:number){
        return this.ingredientArray[index];
    }

    addIngredient(ingredient : Ingredient){
        this.ingredientArray.push(ingredient);
        this.newIngredients.next(this.ingredientArray.slice());
    }

    updateIngredient(index:number,newIngredient:Ingredient){
      this.ingredientArray[index] = newIngredient;
      this.newIngredients.next(this.ingredientArray.slice());
    }

    addIngredients(ingredients:Ingredient[]){
        // for (let ingredient of ingredients) {
        //     this.addIngredient(ingredient)
        // }
        this.ingredientArray.push(...ingredients);   //this.ingredientArray.push(ing1,ing2,ing3);
        this.newIngredients.next(this.ingredientArray.slice());

    }


}
