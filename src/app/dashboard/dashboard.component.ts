import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { DataService } from '../data.service';
import { Subscription } from 'rxjs/Subscription';


import { ProductInterface as Product } from '../product-interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  productsList: Array<Product>;
  productStreamSubscription: Subscription;
  constructor(private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
  ) {

    this.productsList = [];
   this.productStreamSubscription =this.dataService.productStream.subscribe((data: Array<Product>) => {
      this.productsList = data;
      console.log("App component ", this.productsList);
    });
  }


  editProduct(id: string) {
    this.router.navigate(['/edit', id]);
  }


  ngOnInit() {
  }

  ngOnDestroy() {
    //Cleaning up subscriptions
    this.productStreamSubscription.unsubscribe();
  }

}
