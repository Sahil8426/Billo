import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/models/cart.model';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  template: '<app-header [cart]="cart"> </app-header> <router-outlet> </router-outlet>'
  ,
  styles: []
})
export class AppComponent implements OnInit {
title(title: any) {
  throw new Error('Method not implemented.');
}
  
cart: Cart = {items:[]};


constructor (private cartService: CartService){}

ngOnInit()
{
  this.cartService.cart.subscribe((_cart) => {

    this.cart = _cart;
  });
}


}
