import { NgForOf } from '@angular/common';
import { Route } from '@angular/compiler/src/core';
import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService , AuthResponseData } from './auth.service';
import { AlertComponent} from '../shared/alert-box/alert.component';
import { PlaceHolderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
    selector:'auth-app',
    templateUrl:'./auth.component.html'
})
export class AuthComponent implements OnDestroy{
    isLoginMode = true;
    isLoading = false;
    error = '';
    private subscription:Subscription;
    @ViewChild(PlaceHolderDirective,{static:false}) alertHost : PlaceHolderDirective;


    constructor(private authService : AuthService,
                private router:Router,
                private componentFactoryResolver : ComponentFactoryResolver){}

    ngOnDestroy(){
      if(this.subscription){
          this.subscription.unsubscribe();
      }
    }

    onSwitchMode(){
        this.isLoginMode = ! this.isLoginMode;
    }

    onHandleError(){
         this.error = null;
    }

    onSubmit(form : NgForm){
        if(!form.valid){
            return;
        }
        const email = form.value.email;
        const password = form.value.password;

        let authObs : Observable<AuthResponseData>;
        
        this.isLoading = true;
        if(this.isLoginMode){
            authObs =  this.authService.login(email,password)
        }else{
            authObs =  this.authService.signup(email,password);
        }

        authObs.subscribe(resData =>{ 
            console.log("ki",resData);
            this.isLoading = false;
            this.router.navigate(['/recipes']);
        },errorMessage=>{
            this.error = errorMessage;
            this.isLoading = false;
            this.showErrorALert(errorMessage);
        
        });
        
        form.reset();
    }

    showErrorALert(errorMessage : string){
        // const alertCmp = new AlertComponent();
       const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

       const hostViewContainerRef = this.alertHost.viewContaierRef;
       hostViewContainerRef.clear();

       const componentRef =  hostViewContainerRef.createComponent(alertCmpFactory);
       componentRef.instance.message = errorMessage;
       this.subscription = componentRef.instance.close.subscribe(()=>{
          this.subscription.unsubscribe();
          hostViewContainerRef.clear();
       });
    }
}