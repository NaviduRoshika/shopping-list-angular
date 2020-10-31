import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipesResolverService } from './recipes-resolver.service';
import { AuthGuard } from '../auth/auth.guard';

const routes:Routes = [
    {path:'',component:RecipesComponent,              //included in app-routing - lazy loading
    canActivate:[AuthGuard],
    children:[
         {path:'',component:RecipeStartComponent},
         {path:'new',component:RecipeEditComponent},
         {path:':id',component:RecipeDetailsComponent,resolve:[RecipesResolverService]},
         {path:':id/edit',component:RecipeEditComponent,resolve:[RecipesResolverService]},
   ]},
];

@NgModule({
   imports:[RouterModule.forChild(routes)],   //CHILD
   exports:[RouterModule]
})
export class RecipesRoutingModule{}