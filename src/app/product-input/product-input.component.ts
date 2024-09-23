import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../ProductClass/ProductClass';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-product-input',
  templateUrl: './product-input.component.html',
  styleUrls: ['./product-input.component.css']
})

export class ProductInputComponent {
  product = new Product();  // prodId is null by default
  route: string | undefined = "";
  productForm: FormGroup;
  selectedFile: File | null = null;
  imagePreview: string | null = null;  // For storing the image preview

  constructor(
    private activeRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private sanitizer: DomSanitizer // Inject DomSanitizer
  ) {
    // Router params
    this.route = activeRoute.snapshot.routeConfig?.path;
    const routeParam = this.activeRoute.snapshot.paramMap.get('prodId');
    if (routeParam != null) {
      let prodId = parseInt(routeParam);
      console.log(prodId);
      this.getProduct(prodId);
    }

    this.productForm = new FormGroup({
      Name: new FormControl('', Validators.required),
      Description: new FormControl('', Validators.required),
      Brand: new FormControl('', Validators.required),
      Rating: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(5)]),
      Price: new FormControl(0, Validators.required),
      Stock: new FormControl(0, Validators.required),
      Discount: new FormControl(0, Validators.required),
      Image: new FormControl(null)
    });
  }

  // Handle file selection for new image upload
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      // Create a preview of the selected image
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;  // Show the base64 preview in the template
      };
      reader.readAsDataURL(file);
    }
  }

  // Fetch product from the backend and populate the form
  getProduct(id: number): void {
    const obs = this.productService.getProductById(id);
    obs.subscribe({
      next: (product) => {
        this.product.prodId = product.prodId;
        // Create an image preview from base64 string (received from backend)
        if (product.Image) {
          this.imagePreview = this.sanitizer.bypassSecurityTrustUrl(`data:image/jpeg;base64,${product.Image}`) as string;
        }
        // Populate the form with product data
        this.productForm.setValue({
          Name: product.Name,
          Description: product.Description,
          Brand: product.Brand,
          Rating: product.Rating,
          Price: product.Price,
          Stock: product.Stock,
          Discount: product.Discount,
          Image: null
        });
      },
      error: (err) => {
        console.log(err);
        window.alert("Something went wrong while fetching the product.");
      }
    });
  }


  onSubmit(): void {
    if (this.productForm.valid) {
      const formData = new FormData();
      // Append form data fields
      formData.append('Name', this.productForm.get('Name')?.value);
      formData.append('Description', this.productForm.get('Description')?.value);
      formData.append('Brand', this.productForm.get('Brand')?.value);
      formData.append('Rating', this.productForm.get('Rating')?.value);
      formData.append('Price', this.productForm.get('Price')?.value);
      formData.append('Stock', this.productForm.get('Stock')?.value);
      formData.append('Discount', this.productForm.get('Discount')?.value);

      // Append the selected file (image) if it exists
      if (this.selectedFile && this.route?.includes('addProduct')) {
        formData.append('Image', this.selectedFile);
      }
      if (this.route?.includes('addProduct'))
        this.addProduct(formData);
      else
        this.updateProduct(formData);
    } else {
      this.productForm.markAllAsTouched();
    }
  }

  addProduct(formData: FormData) {
    const obs = this.productService.createProduct(formData);
    obs.subscribe({
      next: (product) => {
        console.log(`Product added successfully`, product);
        window.alert(`Product added Successfully`);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.log(err);
        window.alert("Something went wrong while adding...");
      }
    });
  }

  updateProduct(formData: FormData) {
    const obs = this.productService.updateProduct(this.product.prodId, formData);
    obs.subscribe({
      next: (product) => {
        console.log('Product updated successfully:', product);
        window.alert('Product updated successfully');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.log(err);
        window.alert("Something went wrong while updating...");
      }
    });
  }

  get f() {
    return this.productForm.controls;
  }
}

