import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { Subscription } from 'rxjs';

import { CartService } from 'src/app/services/cart.service';
import { Cart, CartItem } from 'src/models/cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  cart: Cart = {items:[]};


  dataSource: CartItem[] = [];
  cartSubscription: Subscription | undefined;

displayedColumns: Array<string> = [

  'product',
   'name',
  'price',
  'quantity',
  'total',
  'action'

];

  constructor(private cartService : CartService , private http: HttpClient){}

  ngOnInit():void{


    
    this.cartSubscription = this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    });

  }

  getTotal(items:Array<CartItem>):number{

    return items.map((item) =>item.price * item.quantity)
    .reduce((prev,current) => prev+current,0)

    
  }


  onRemoveFromCart(item: CartItem):void
  {

    this.cartService.removeFromCart(item);

  }

  onClearCart():void{

    this.cartService.clearCart();
  }

  onAddQuantity(item: CartItem):void
  {

    this.cartService.addToCart(item);

  }

  onRemoveQuantity(item: CartItem): void
  {

    this.cartService.removeQuantity(item);

  }

  onCheckout():void {

    this.http.post('http://localhost:4242/checkout',{ items:this.cart.items}).subscribe(async(res:any)=>{
      let stripe = await loadStripe('pk_test_51ODRxQSG8N54Feepzn72N9JPWkMvNjwxxMLmH3tyrBTAGGIdfguX2ztWvkkMoDSoEwGtTajwyp6lQOtJjGSfnFJd00YLjYXQGq');
      stripe?.redirectToCheckout({sessionId:res.id})
    });

  }
 

}
