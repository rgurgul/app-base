import { MyLibModule, configToken } from 'my-lib';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';



@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: CartComponent }
    ]),
    MyLibModule
  ],
  providers:[
    {provide: configToken, useValue: {color: 'black'}}
  ]
})
export class CartModule { }
