import { Utils } from './../../../utils/utils';
import { CartIDBService } from './cart.idb.service';
import { first, map, skip } from 'rxjs/operators';
import { CartItemModel } from './../../../utils/models';
import { Injectable } from '@angular/core';
import { Store } from '../../../utils/store';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService extends Store<CartItemModel[]> {

  constructor(
    private idbService: CartIDBService
  ) {
    super([]);
    from(this.idbService.get()).subscribe((val: any) => {
      this.setState(val);
    })
    this.getState()
      .pipe(
        skip(1)
      )
      .subscribe((val: any) => idbService.update(val));

  }
  add(item: CartItemModel) {
    this.getState()
      .pipe(
        map((val) => Utils.addOrIncreaseParam(val, item, 'count')),
        first()
      )
      .subscribe((val) => super.setState(val))
  }

}
