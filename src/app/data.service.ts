import { Injectable } from '@angular/core';
import { ObjectID } from 'bson';
import { ProductInterface as Product } from './product-interface';

import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {

  productsList: Array<Product>;
  initialStreamValue: Array<Product>;
  _productsStream: BehaviorSubject<Array<Product>>;


  constructor() {
    this.initialStreamValue = []; // no products
    this.productsList = [];
    this._productsStream = new BehaviorSubject<Array<Product>>(this.initialStreamValue); //initialize stream

    this.init(); // checking localstorage for data

    localStorage.setItem("we", "we");
    console.log("localstorage ", localStorage.getItem("prod"));
  }

  /**
   * Get data from local storage
   */
  init() {
    let localStorageData = localStorage.getItem("productsList")
    if (localStorageData != null) {
      this.productsList = JSON.parse(localStorageData);
      this._productsStream.next(this.productsList);
    }
  }


  /**
   * return _productStream as Observable
   */
  get productStream() {
    return this._productsStream.asObservable();
  }

   /**
   * Get Product by id from ProductsList
   */
  getProductById(id: string): Product{
    return this.productsList.filter((obj)=>{
      if(obj.id != id)
        return false;
      return true;
    })[0];
  }

  /**
   * Add new Product to ProductsList
   */
  addProduct = (newProduct: Product) => {
    let product = Object.assign({}, newProduct);
    product["id"] = this.generateRandomId();
    product["upvotes"] = 0;
    product["downvotes"] = 0;
    if (product["url"] == undefined || product["url"] == '' || !product["url"].startsWith('http'))
      product["url"] = "http://gemologyproject.com/wiki/images/5/5f/Placeholder.jpg"; // Placeholder if no image is provided

    console.log("Daat service ", product);

    this.productsList.push(product);

    localStorage.setItem("productsList", JSON.stringify(this.productsList)); // Updating productsList inside LocalStorage
    this._productsStream.next(this.productsList);
  }

  /**
   * Edit Product in ProductsList
   */
  editProduct = (prod: Product) => {
    let product = Object.assign({}, prod);
    let updatedProductsList = this.productsList.map((obj)=>{
      if(obj.id == product.id)
        return product;
      return obj;
    });

    this.productsList = updatedProductsList;

    localStorage.setItem("productsList", JSON.stringify(this.productsList)); // Updating productsList inside LocalStorage
    this._productsStream.next(this.productsList);
  }


  /**
   * Delete Product in ProductsList
   */
  deleteProduct = (id: string) => {
    let updatedProductsList = this.productsList.filter((obj)=>{
      if(obj.id == id)
        return false;
      return true;
    });

    this.productsList = updatedProductsList;

    localStorage.setItem("productsList", JSON.stringify(this.productsList)); // Updating productsList inside LocalStorage
    this._productsStream.next(this.productsList);
  }

  /**
   * Generate Random id for new product
   */
  generateRandomId(): string {
    const id = new ObjectID();
    return id.toString();
  }


}
