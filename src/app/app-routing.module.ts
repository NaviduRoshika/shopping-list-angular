import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent} from './home/home.component'

const appRoutes:Routes = [
    {path:'',component:HomeComponent},
    // {path:'recipes',loadChildren:'./recipes/recipes.module#RecipesModule'},
    {path:'recipes',loadChildren:()=> import('./recipes/recipes.module').then(m => m.RecipesModule)},
    {path:'shoppinglist',loadChildren:()=> import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule)},
    {path:'auth',loadChildren:()=> import('./auth/auth.module').then(m => m.AuthModule)}
]; 


@NgModule({
    imports:[RouterModule.forRoot(appRoutes, {useHash:true,preloadingStrategy:PreloadAllModules})],  //preload modules lazyloading
    exports:[RouterModule]
})

export class AppRoutingModule{}