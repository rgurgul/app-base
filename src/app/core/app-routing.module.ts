import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'game', loadChildren: () => import('../features/game/game.module').then((m) => m.GameModule) },
  { path: 'items', loadChildren: () => import('../features/items/items.module').then((m) => m.ItemsModule) },
  { path: 'cart', loadChildren: () => import('../features/cart/cart.module').then((m) => m.CartModule) },
  { path: 'register', loadChildren: () => import('../features/register/register.module').then((m) => m.RegisterModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
