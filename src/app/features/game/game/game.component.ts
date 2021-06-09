import { Message } from './../../../shared/models';
import { Api } from './../../../shared/api';
import { GameApiService } from './../game.service';
import { Component, EmbeddedViewRef, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { catchError, map, retry, switchMap, throttleTime } from 'rxjs/operators';
import { fromEvent, of, throwError } from 'rxjs';
import { ajax } from "rxjs/ajax";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  @ViewChild('playerTpl') playerTpl!: TemplateRef<any>;
  players: Map<string | undefined, EmbeddedViewRef<any>> = new Map();

  constructor(private gameService: GameApiService, private container: ViewContainerRef) {

  }

  ngOnInit(): void {
    this.gameService.getUser()
      .pipe(
        catchError((err) => {
          this.register()
          return throwError(err)
        })
      )
      .subscribe((resp) => {
        this.init()
      })
  }
  register() {
    of('your name')
      .pipe(
        map((msg) => prompt(msg)),
        switchMap((username: any) => {
          //return ajax.post(Api.GAME_REGISTER_USER, { username }, { 'Content-Type': 'application/json' })
          return this.gameService.register(username)
        }),
        retry(2)
      )
      .subscribe((resp) => {
        this.init()
      })
  }
  init() {
    this.gameService.messanger.subscribe((msg: Message) => {
      const exists = this.players.get(msg.username)
      if (exists) {
        exists.context.$implicit = msg;
      } else {
        const view = this.container.createEmbeddedView(this.playerTpl, { $implicit: msg })
        this.players.set(msg.username, view)
      }
    })

    fromEvent<MouseEvent>(document, 'mousemove')
      .pipe(
        throttleTime(30)
      )
      .subscribe(({ clientX, clientY }: MouseEvent) => {
        this.gameService.messanger.next({ clientX, clientY })
      })
  }
}
