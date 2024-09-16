import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../ProductClass/ProductClass';

@Component({
  selector: 'app-product-input',
  templateUrl: './product-input.component.html',
  styleUrls: ['./product-input.component.css']
})
export class ProductInputComponent implements OnInit {
  @Input() product: Product | undefined;

  productForm: FormGroup;

  constructor() {
    // Initialize form controls with validation
    this.productForm = new FormGroup({
      Name: new FormControl('', Validators.required),
      Description: new FormControl('', Validators.required),
      Brand: new FormControl('', Validators.required),
      Rating: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(5)]),
      Price: new FormControl(0, Validators.required),
      Stock: new FormControl(0, Validators.required),
      Discount: new FormControl(0, Validators.required),
      Image: new FormControl('', Validators.required)
    });
  }

  // Function to submit form data
  onSubmit() {
    if (this.productForm.valid) {
      this.product = new Product(
        this.productForm.get('Name')?.value,
        this.productForm.get('Description')?.value,
        this.productForm.get('Brand')?.value,
        this.productForm.get('Rating')?.value,
        this.productForm.get('Price')?.value,
        this.productForm.get('Stock')?.value,
        this.productForm.get('Discount')?.value,
        this.productForm.get('Image')?.value
      );
      console.log('Product submitted:', this.product);
    } else {
      this.productForm.markAllAsTouched();  // Ensure all fields are marked as touched to show validation errors
    }
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product'] && this.product) {
      this.loadProductData(this.product);
    }
  }

  loadProductData(product: Product) {
    if (this.productForm) {
      this.productForm.setValue({
        Name: product.Name,
        Description: product.Description,
        Brand: product.Brand,
        Rating: product.Rating,
        Price: product.Price,
        Stock: product.Stock,
        Discount: product.Discount,
        Image: product.Image
      });
    }
  }

  // Getter for form controls to access validation states in the template
  get f() {
    return this.productForm.controls;
  }
}
