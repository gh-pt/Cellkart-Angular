import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../ProductClass/ProductClass';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})

export class ProductCardComponent {
  @Input() product!: Product; // The product data passed to the card
  @Output() emitter = new EventEmitter<number>();

  // Use a property to hold the image URL
  productImageUrl: string | undefined;

  ngOnInit(): void {
    if (this.product && this.product.Image) {
      this.productImageUrl = `data:image/jpeg;base64,${this.toBase64(this.product.Image.data)}`;
    }
  }

  private toBase64(arr: any) {
    return btoa(
      arr?.reduce((data: any, byte: any) => data + String.fromCharCode(byte), "")
    );
  }
}
