import { map, mapTo, take, tap, filter } from 'rxjs/operators';
import { ItemsService } from './services/items.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemsGuard implements CanActivate {

  constructor(
    private itemsService: ItemsService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.itemsService
      .getState()
      .pipe(
        tap((val: any[]) => !val.length && this.itemsService.fetch()),
        filter((val) => !!val.length),
        take(1),
        mapTo(true)
      )
      ;
  }

}
