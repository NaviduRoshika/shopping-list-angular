import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe-list/recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css'],
})
export class RecipeDetailsComponent implements OnInit {
  selectedRecipe: Recipe;
  id:number;

  constructor(private recipeService: RecipeService,private route:ActivatedRoute,private router:Router) {}

  ngOnInit(): void {
    // const id = +this.route.snapshot.params['id'];
    // this.selectedRecipe = this.recipeService.getRecipe(id);
    this.route.params.subscribe(
      (params:Params)=>{
        this.id = +params['id'];
        this.selectedRecipe = this.recipeService.getRecipe(this.id);
      }
    );
  }

  onAddtoShoppingList(){
    this.recipeService.addIngredientsToShoppingList(this.selectedRecipe.ingredients);
  }

  // onEditRecipe(){
  //      this.router.navigate([this.id,'edit']);
  // }
  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
