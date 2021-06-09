import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ItemsComponent } from './items/items.component';
import { bgColor, MyLibModule } from 'my-lib';


@NgModule({
  declarations: [
    ItemsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: ItemsComponent },
    ]),
    MyLibModule
  ],
  providers: [
    { provide: bgColor, useValue: 'violet' }
  ]
})
export class ItemsModule { }
