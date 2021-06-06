import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ItemsComponent } from './items/items.component';


@NgModule({
  declarations: [
    ItemsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: ItemsComponent },
    ])
  ]
})
export class ItemsModule { }
