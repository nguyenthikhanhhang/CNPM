import { Routes } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { StaffComponent } from './staff/staff';

import { PosComponent } from './staff/pos/pos';
import { Orders } from './staff/orders/orders';
import { Products } from './staff/products/products';
import { Customers } from './staff/customers/customers';

// Import AdminDashboardComponent nếu bạn có trang Quản trị
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard'; 

export const routes: Routes = [
  // 1. Mới vào trang web (localhost:4200) -> Mở Trang chủ khách hàng
  { path: '', component: CustomerComponent, pathMatch: 'full' },

  // 2. Trang Quản trị Hệ thống ODYDDEY
  { path: 'admin', component: AdminDashboardComponent },

  // 3. Trang Nhân viên (Staff)
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

  // 4. Đường dẫn không tồn tại -> Chuyển hướng về Trang chủ
  { path: '**', redirectTo: '' }
];