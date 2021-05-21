import { Message } from './../../../utils/models';
import { GameApiService } from './../game.service';
import { Component, EmbeddedViewRef, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { catchError, map, retry, switchMap, throttleTime } from 'rxjs/operators';
import { fromEvent, of, throwError } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  @ViewChild('playerTpl') playerTpl!: TemplateRef<any>;
  players: Map<string | undefined, EmbeddedViewRef<any>> = new Map();

  constructor(
    private gameService: GameApiService,
    private container: ViewContainerRef
  ) { }

  ngOnInit(): void {
    this.gameService.getUser()
      .pipe(
        catchError((err) => {
          this.register();
          return throwError;
        })
      )
      .subscribe((resp) => {
        this.init();
      })
  }

  init() {
    this.gameService.messanger.subscribe((msg: Message) => {
      this.updateGame(msg);
    })

    fromEvent<MouseEvent>(document, 'mousemove')
      .pipe(
        throttleTime(30)
      )
      .subscribe(({ clientX, clientY }: MouseEvent) => {
        this.gameService.messanger.next({ clientX, clientY });
      })
  }
  updateGame(msg: Message) {
    const player = this.players.get(msg.username)
    if (player) {
      player.context.$implicit = msg;
    } else {
      const view = this.container.createEmbeddedView(this.playerTpl, { $implicit: msg });
      this.players.set(msg.username, view);
    }
  }

  register() {
    of('your name /^[a-zA-Z]{3,6}$/')
      .pipe(
        map(txt => prompt(txt)),
        switchMap(username => this.gameService.register(username as string)),
        catchError((error) => {
          console.log('register error', JSON.stringify(error));
          return throwError(error);
        }),
        retry(1)
      )
      .subscribe(this.init.bind(this))
  }

}
