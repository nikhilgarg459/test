import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductComponent }   from './product/product.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'add', component: ProductFormComponent },
  { path: 'edit/:id', component: ProductFormComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}