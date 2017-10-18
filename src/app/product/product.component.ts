import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductInterface as Product } from '../product-interface';

import { DataService } from '../data.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() product: Product;
  @Output() editRequest: EventEmitter<string> = new EventEmitter<string>();
  popularityValue;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    if (+this.product["upvotes"] == 0 && +this.product["downvotes"] == 0)
      this.popularityValue = 0;
    else
      this.popularityValue = (+this.product["upvotes"] / (+this.product["upvotes"] + +this.product["downvotes"])) * 100;
  }

  /**
  * Edit Request to the parent
  */
  edit = (id: string) => {
    this.editRequest.emit(id);
  }

  delete = (id: string) => {
    this.dataService.deleteProduct(id);
  }

  /**
   * Upvote Request to the parent
   */
  downvote = () => {
    this.product["downvotes"] = +this.product["downvotes"] + 1;
    console.log("downvotes " + this.product["downvotes"]);
    this.updatePopularityBar();
  }

  /**
   * Downvote Request to the parent
   */
  upvote = () => {
    this.product["upvotes"] = +this.product["upvotes"] + 1;
    console.log("upvotes " + this.product["upvotes"]);
    this.updatePopularityBar();
  }

  /**
   * Popularity Bar Update
   */
  updatePopularityBar() {
    //this.popularityValue = (+this.product["upvotes"] / (+this.product["upvotes"] + +this.product["downvotes"])) * 100;
    this.dataService.editProduct(this.product);
  }

}
