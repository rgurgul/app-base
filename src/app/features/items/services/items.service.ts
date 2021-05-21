import { map, tap } from 'rxjs/operators';
import { Api } from './../../../utils/api';
import { HttpClient } from '@angular/common/http';
import { ItemModel } from './../../../utils/models';
import { Injectable } from '@angular/core';
import { Store } from '../../../utils/store';

@Injectable({
  providedIn: 'root'
})
export class ItemsService extends Store<ItemModel[]> {

  constructor(
    private http: HttpClient
  ) {
    super([]);
  }

  fetch(){
    this.http.get(Api.DATA_ITEMS)
      .pipe(
        map((resp: any) => resp.data),
        tap((data) => this.setState(data))
      ).subscribe();
  }

}
