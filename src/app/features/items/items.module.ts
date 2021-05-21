import { ItemsGuard } from './items.guard';
import { RouterModule, CanActivate } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsComponent } from './items/items.component';
import { configToken, MyLibModule } from 'my-lib';
import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [
    ItemsComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', canActivate: [ItemsGuard], component: ItemsComponent },
      { path: ':id', canActivate: [ItemsGuard], component: DetailsComponent },
    ]),
    MyLibModule
  ],
  providers: [
    { provide: configToken, useValue: { color: 'violet' } }
  ]
})
export class ItemsModule { }
