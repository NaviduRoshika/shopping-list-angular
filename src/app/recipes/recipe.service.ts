import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import {Recipe} from './recipe-list/recipe.model'

@Injectable()
export class RecipeService{
   recipesChanged = new Subject<Recipe[]>();

   constructor(private slService: ShoppingListService){}
   recipeSelected = new EventEmitter<Recipe>();
   ing1:Ingredient = new Ingredient('Meat',1);
  //  private recipes: Recipe[] = [
  //       new Recipe(
  //         1,
  //         'Hamburger',
  //         'cooked patties of ground meat',
  //         'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/RedDot_Burger.jpg/1200px-RedDot_Burger.jpg',
  //          [this.ing1,new Ingredient('Bean',15)]
  //         ),
  //       new Recipe(
  //         2,
  //         'Pizza',
  //         'world’s most popular fast food',
  //         'https://static.toiimg.com/thumb/76481989.cms?width=680&height=512&imgsize=170646',
  //         [new Ingredient('Meat',1),new Ingredient('Carrot',10)]
  //       ),
  //     ];

  private recipes:Recipe[] = [];

    getRecipes(){
        return this.recipes.slice();
    }

    setRecipes(recipes : Recipe[]){
      this.recipes = recipes;
      this.recipesChanged.next(this.recipes.slice());
    }

    addIngredientsToShoppingList(ingredients:Ingredient[]){
         this.slService.addIngredients(ingredients);
    }

    getRecipe(id:number){
      const recipe = this.recipes.find(
        (r)=>{
          return r.recipeId === id;
        }
      );
      return recipe;
    }

    addRecipe(recipe:Recipe){
      this.recipes.push(recipe);
      this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index:number,newRecipe:Recipe){
         const recipeArrId = this.recipes.findIndex(
          (r)=>{
            return r.recipeId === index;
          }
        );
         this.recipes[recipeArrId] = newRecipe;
         this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index:number){
      const recipeArrId = this.recipes.findIndex((r)=>{return r.recipeId === index;});
      this.recipes.splice(recipeArrId,1);
      this.recipesChanged.next(this.recipes.slice());
    }
}