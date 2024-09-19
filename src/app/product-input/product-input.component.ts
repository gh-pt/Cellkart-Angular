import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../ProductClass/ProductClass';
import { ProductService } from '../services/product.service'; // Import the service
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-input',
  templateUrl: './product-input.component.html',
  styleUrls: ['./product-input.component.css']
})

export class ProductInputComponent implements OnInit {
  @Input() product: Product | undefined;

  productForm: FormGroup;
  selectedFile: File | null = null; // For holding the selected file

  constructor(private productService: ProductService, private router:Router) { // Inject your service
    // Initialize form controls with validation
    this.productForm = new FormGroup({
      Name: new FormControl('', Validators.required),
      Description: new FormControl('', Validators.required),
      Brand: new FormControl('', Validators.required),
      Rating: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(5)]),
      Price: new FormControl(0, Validators.required),
      Stock: new FormControl(0, Validators.required),
      Discount: new FormControl(0, Validators.required),
      Image: new FormControl('', Validators.required) // No longer directly required for FormControl
    });
  }

  // Handle file selection
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.productForm.get('Image')?.setValue(file.name); // Set file name just for form validation
    }
  }

  // Function to submit form data
  onSubmit() {
    if (this.productForm.valid && this.selectedFile) {
      const formData = new FormData();

      // Append form fields to FormData
      formData.append('Name', this.productForm.get('Name')?.value);
      formData.append('Description', this.productForm.get('Description')?.value);
      formData.append('Brand', this.productForm.get('Brand')?.value);
      formData.append('Rating', this.productForm.get('Rating')?.value);
      formData.append('Price', this.productForm.get('Price')?.value);
      formData.append('Stock', this.productForm.get('Stock')?.value);
      formData.append('Discount', this.productForm.get('Discount')?.value);

      // Append the file to FormData as 'Image'
      formData.append('Image', this.selectedFile);

      console.log(formData)
      // Send the form data using the service
      const obs = this.productService.createProduct(formData);
      obs.subscribe({
        next:(product)=>{
          console.log(`Product addedd successfully,${product}`)
          window.alert(`Product added Successfully`)
          this.router.navigate(['/home']);
        },
        error:(err)=>{
          console.log(err)
          window.alert("something went wrong while adding...")
        }
      }
      );
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
