import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';


import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from "./app-routing.module";

// import { RecipesModule } from './recipes/recipes.module';
// import { ShoppingListModule } from './shopping-list/shopping-list.module';
// import { AuthModule } from './auth/auth.module';

import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
  ],
  imports: [
        //  AuthModule,           - lazy loading
         BrowserModule,
         HttpClientModule,
         AppRoutingModule, 
        //  RecipesModule,
        //  ShoppingListModule,
         SharedModule,
         CoreModule],
  providers:[],
  bootstrap: [AppComponent],
  // entryComponents:[AlertComponent]   //no need in highr than ang 9
})
export class AppModule {}
