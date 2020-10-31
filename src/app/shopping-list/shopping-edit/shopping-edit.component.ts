import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  EventEmitter,
  Output,
  OnDestroy,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit,OnDestroy{
  // @ViewChild('nameInput') nameInputRef: ElementRef;
  // @ViewChild('amountInput') amountInputRef: ElementRef;
  // @Output() ingredientAdded = new EventEmitter<Ingredient>();

  @ViewChild('f',{static:false})slForm:NgForm;
  subcription : Subscription;
  editMode = false;
  editedItemIndex:number;
  editedItem:Ingredient;

  constructor(private shoppingListService : ShoppingListService) {}

  ngOnInit(): void {
    this.subcription =  this.shoppingListService.startedEditing
    .subscribe(
      (index:number)=>{
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.slForm.setValue({
          name:this.editedItem.name,
          amount:this.editedItem.amount
        });
      }
    );
  }

  // onItemAdd() {
  //   // const ingName = this.nameInputRef.nativeElement.value;
  //   // const ingAmount = this.amountInputRef.nativeElement.value;
  //   // const newIngredient = new Ingredient(ingName, ingAmount);
  //   // this.ingredientAdded.emit(newIngredient);
  //   this.shoppingListService.addIngredient(newIngredient);
  // }

  onAddItem(form : NgForm){
     const value = form.value;
     const newIngredient = new Ingredient(value.name , value.amount);
     if(this.editMode){
       this.shoppingListService.updateIngredient(this.editedItemIndex,newIngredient);
     }else{
      this.shoppingListService.addIngredient(newIngredient);
     }
    //  this.slForm.setValue({
    //    name:'',
    //    amount:null
    //  });
     this.slForm.reset();
     this.editMode = false;

  }

  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }

  ngOnDestroy(){
    this.subcription.unsubscribe();
  }
}
