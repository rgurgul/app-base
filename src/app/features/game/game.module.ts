import { RouterModule } from '@angular/router';
import { GameComponent } from './game/game.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    GameComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: GameComponent }
    ])
  ],
})
export class GameModule { }
