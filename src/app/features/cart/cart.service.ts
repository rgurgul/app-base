import { Utils } from './../../shared/utils';
import { of } from 'rxjs';
import { CartItemModel, ItemModel } from './../../shared/models';
import { Injectable } from '@angular/core';
import { Store } from '../../shared/store';
import { take, withLatestFrom } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CartService extends Store<CartItemModel[]> {
  removeItem(item: any) {
    of(item)
      .pipe(
        withLatestFrom(super.getState()),
        take(1)
      )
      .subscribe(([item, state]) => {
        const newState = Utils.removeOrDecreaseParam(state, item, 'count')
        super.setState(newState);
      })
  }

  addItem(item: ItemModel) {
    of(item)
      .pipe(
        withLatestFrom(super.getState()),
        take(1)
      )
      .subscribe(([item, state]) => {
        const newState = Utils.addOrIncreaseParam(state, item, 'count')
        super.setState(newState);
      })
  }

  constructor() {
    super([]);
  }
}
