import { CartService } from './../../cart/services/cart.service';
import { ItemsService } from './../services/items.service';
import { Api } from './../../../utils/api';
import { HttpClient } from '@angular/common/http';
import { FieldTypes, HttpResponseModel, ItemModel } from './../../../utils/models';
import { Component, OnInit } from '@angular/core';
import { FieldConfig } from 'my-lib/lib/components/form-generator/models';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  config!: FieldConfig[];
  items$!: Observable<ItemModel[] | any>;

  constructor(
    private itemsService: ItemsService,
    private router: Router,
    private cartService: CartService
  ) {
  }

  add(item: ItemModel) {
    this.cartService.add({ ...item, count: 1 })
  }

  remove(item: any) {

  }

  more(item: any) {
    this.router.navigate(['items', item.id]);
  }

  ngOnInit(): void {
    this.items$ = this.itemsService.getState();
  }

}
