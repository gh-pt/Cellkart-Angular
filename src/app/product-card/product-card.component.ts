import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../ProductClass/ProductClass';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})

export class ProductCardComponent {
  @Input() product!: Product; // The product data passed to the card
  @Output() editProduct = new EventEmitter<Product>(); // Event to emit product data for editing

  onEdit() {
    this.editProduct.emit(this.product); // Emit the selected product when Edit is clicked
    console.log("Card: ",this.product)
  }
}
