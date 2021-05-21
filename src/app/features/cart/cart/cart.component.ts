import { CartItemModel } from './../../../utils/models';
import { Observable } from 'rxjs';
import { CartService } from './../services/cart.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cart$!: Observable<CartItemModel[] | any>;

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.cart$ = this.cartService.getState();
  }

  add(item: any) {
    this.cartService.add(item);
  }

}
