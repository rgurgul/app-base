import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'game', loadChildren: () => import('../features/game/game.module').then((m) => m.GameModule) },
  { path: 'items', loadChildren: () => import('../features/items/items.module').then((m) => m.ItemsModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
