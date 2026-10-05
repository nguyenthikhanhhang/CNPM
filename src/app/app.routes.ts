import { Routes } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { StaffComponent } from './staff/staff';

import { PosComponent } from './staff/pos/pos';
import { Orders } from './staff/orders/orders';
import { Products } from './staff/products/products';
import { Customers } from './staff/customers/customers';

export const routes: Routes = [
  { path: '', component: CustomerComponent },

  {
    path: 'staff',
    component: StaffComponent,
    children: [
      { path: '', redirectTo: 'pos', pathMatch: 'full' },
      { path: 'pos', component: PosComponent },
      { path: 'orders', component: Orders },
      { path: 'products', component: Products },
      { path: 'customers', component: Customers }
    ]
  },

  { path: '**', redirectTo: '' }
];