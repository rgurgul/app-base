import { map } from 'rxjs/operators';
import { Api } from './../../shared/api';
import { CartService } from './../cart/cart.service';
import { ItemModel, HttpResponseModel } from './../../shared/models';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '../../shared/store';

@Injectable({ providedIn: 'root' })
export class ItemsService extends Store<ItemModel[]> {

  constructor(
    private http: HttpClient,
    private cartStore: CartService
  ) {
    super([]);
    this.http.get<HttpResponseModel>(Api.DATA_ITEMS)
      .pipe(map((resp: HttpResponseModel) => resp.data))
      .subscribe((resp) => {
        this.setState(resp);
      })
  }

  addItem(item: ItemModel) {
    this.cartStore.addItem(item)
  }

  removeItem() {

  }
}
