import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup} from '@angular/forms';
import { ProductInterface as Product } from '../product-interface';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

import { DataService } from '../data.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  productForm: FormGroup;
  selectedId: string;
  product: Product;
  submitValue: string;

  constructor(private formBuilder: FormBuilder,
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router) {
    this.createForm();
  }

  createForm() {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      url: '',
      description: ['', Validators.required]
    });
  }

  onSubmit() {
    //On Add
    if (this.product == undefined) {
      let newProduct: Product = this.productForm.value;
      this.dataService.addProduct(newProduct);
    }
    //On Edit
    else {
      let updatedProduct = Object.assign({}, this.product, this.productForm.value)
      this.dataService.editProduct(updatedProduct);
    }
    this.productForm.reset();
    this.router.navigate(['/dashboard'])
  }


  ngOnInit() {
    this.selectedId = this.route.snapshot.params['id']; 

    if (this.selectedId != undefined) { // Getting product from DataService on Edit
      this.submitValue = "Update";
      this.product = this.dataService.getProductById(this.selectedId);

      this.productForm.setValue({
        name: this.product.name,
        description: this.product.description,
        url: this.product.url
      });
    }
    else{
      this.submitValue = "Add";
    }
  }
}
