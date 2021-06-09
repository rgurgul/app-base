import { CartItemModel } from './../../../shared/models';
import { CartService } from './../../../features/cart/cart.service';
import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  cartCount$: Observable<number>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    public cartStore: CartService
  ) {
    this.cartCount$ = cartStore.getState().pipe(map((state: any[]) => state.length));
  }

}
