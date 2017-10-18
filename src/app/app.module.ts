import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';


import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule, MatProgressBarModule,
        MatIconModule, MatButtonModule,
        MatInputModule, MatTabsModule} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';


import { ProductComponent } from './product/product.component';
import { ProductFormComponent } from './product-form/product-form.component';

import { DataService } from './data.service';

import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductFormComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
   // BrowserAnimationsModule,
    MatIconModule,
    MatCardModule,
    MatProgressBarModule,
    MatButtonModule,
    //MatTabsModule
  ],
  providers: [ DataService ],
  bootstrap: [AppComponent],
  entryComponents:[
    ProductFormComponent
  ]
})
export class AppModule { }
