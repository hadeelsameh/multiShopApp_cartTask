import { Injectable } from '@angular/core';
import { CartLine } from '../interfaces/cart-item';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartLines: Array<CartLine> = [];
  constructor() {

  }

  getProducts(): Array<CartLine> {
    return this.cartLines;
  }

  getProductCount(): number {
    return this.cartLines.length;
  }

  addProduct(product: Product) {
    let itemFound = false;
    for (let i = 0; i < this.cartLines.length; i++) {
      if (this.cartLines[i].product.id === product.id) {
        this.cartLines[i].count += 1;
        itemFound = true;
      }
    }
    if (!itemFound) {
      this.cartLines.push(new CartLine(product));
    }

  }

  //Implement function removeProduct
  removeProduct(productId: number) {
    let index = this.cartLines.findIndex((l) => l.product.id === productId);
    if (index >= 0) this.removeLine(index);
  }
  //Implement function removeLine
  removeLine(index: number) {
    this.cartLines.splice(index, 1);

  }

  getTotal() {
    if(this.cartLines.length>0){
      return this.getSubTotal() + this.getShipping();
    }else{
      return 0
    }
  }

  getSubTotal() {
    if(this.cartLines.length>0){
      return this.cartLines.map((l) => l.product.price * l.count).reduce((a, v) => (a += v));
    }else{
      return 0
    }

  }

  getShipping() {
    return 10;
  }

  addItem(index: number) {
    this.cartLines[index].count++;
  }

  removeItem(index: number) {
    this.cartLines[index].count--;
    if (this.cartLines[index].count == 0) this.removeLine(index);

  }
}
