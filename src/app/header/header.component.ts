import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy{
  @Output() featureSelected = new EventEmitter<string>();
  isAthenticated = false;
  private userSub : Subscription;

  constructor(private dataStorageService :DataStorageService,
              private authService : AuthService,
              private router:Router){}
  
  ngOnInit(){
     this.userSub = this.authService.user.subscribe(user=>{
       this.isAthenticated = !!user;
      //  console.log("kio" + user);
      //  console.log("kio 2" + !user);
      //  console.log("kio 3" + !!user);
     });
  }
  
  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }
  
  onSaveData(){
    this.dataStorageService.storeRecipes();
  }

  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout(){
    this.authService.logOut();
    // console.log(this.isAthenticated); 
    this.router.navigate(['/auth']);
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
}
