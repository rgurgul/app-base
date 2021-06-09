import { Observable } from 'rxjs';
import { CartService } from './../../cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  data$!: Observable<any>;

  constructor(
    private cartStore: CartService
  ) { }

  ngOnInit(): void {
    this.data$ = this.cartStore.getState();

    //this.cartStore.setState([{category: 'x', count:1,imgSrc:'', price:123,title:'tomato'}])
  }

  add(item: any) {
    this.cartStore.addItem(item)
  }

  remove(item: any) {
    this.cartStore.removeItem(item)
  }

}
