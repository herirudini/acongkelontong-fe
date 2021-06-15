import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CashierComponent } from './_components/cashier/cashier.component';
import { FinanceComponent } from './_components/finance/finance.component';
import { InventoryComponent } from './_components/inventory/inventory.component';
import { CreateUserComponent } from './_components/owner/employee/create-user/create-user.component';
import { OwnerComponent } from './_components/owner/owner.component';
import { LoginComponent } from './_components/login/login.component';
import { AuthGuard } from './_services/auth.guard';
import { ForgetPasswordComponent } from './_components/login/forget-password/forget-password.component';
import { ResetPasswordComponent } from './_components/login/reset-password/reset-password.component';
import { HomeComponent } from './_components/home/home.component';
import { OutcomeComponent } from './_components/finance/outcome/outcome.component';
import { InvoiceDetailComponent } from './_components/finance/invoice/invoice-detail/invoice-detail.component';
import { SuplierComponent } from './_components/inventory/suplier/suplier.component';
import { OrderComponent } from './_components/inventory/order/order.component';
import { ProductComponent } from './_components/inventory/product/product.component';
import { EmployeeComponent } from './_components/owner/employee/employee.component';
import { CashflowComponent } from './_components/owner/cashflow/cashflow.component';
import { TopTenComponent } from './_components/owner/top-ten/top-ten.component';
import { IncomeComponent } from './_components/finance/income/income.component';
import { InvoiceComponent } from './_components/finance/invoice/invoice.component';
import { CartComponent } from './_components/cashier/cart/cart.component';
import { ReceiptsComponent } from './_components/cashier/receipts/receipts.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'login/forget-password',
    component: ForgetPasswordComponent,
  },
  {
    path: 'login/reset-password/:user_id/:superkey',
    component: ResetPasswordComponent,
  },
  {
    path: 'owner',
    component: OwnerComponent,
    canActivate: [AuthGuard],
    data: ['owner']
  },
  {
    path: 'owner/employee',
    component: EmployeeComponent,
    canActivate: [AuthGuard],
    data: ['owner']
  },
  {
    path: 'owner/cashflow',
    component: CashflowComponent,
    canActivate: [AuthGuard],
    data: ['owner']
  },
  {
    path: 'owner/top-10',
    component: TopTenComponent,
    canActivate: [AuthGuard],
    data: ['owner']
  },
  {
    path: 'inventory',
    component: InventoryComponent,
    canActivate: [AuthGuard],
    data: ['inventory']
  },
  {
    path: 'inventory/suplier',
    component: SuplierComponent,
    canActivate: [AuthGuard],
    data: ['inventory']
  },
  {
    path: 'inventory/order',
    component: OrderComponent,
    canActivate: [AuthGuard],
    data: ['inventory']
  },
  {
    path: 'inventory/product',
    component: ProductComponent,
    canActivate: [AuthGuard],
    data: ['inventory']
  },
  {
    path: 'finance',
    component: FinanceComponent,
    canActivate: [AuthGuard],
    data: ['finance']
  },
  {
    path: 'finance/invoices',
    component: InvoiceComponent,
    canActivate: [AuthGuard],
    data: ['finance']
  },
  {
    path: 'finance/income',
    component: IncomeComponent,
    canActivate: [AuthGuard],
    data: ['finance']
  },
  {
    path: 'finance/outcome',
    component: OutcomeComponent,
    canActivate: [AuthGuard],
    data: ['finance']
  },
  {
    path: 'finance/invoice/:invoice_id',
    component: InvoiceDetailComponent,
    canActivate: [AuthGuard],
    data: ['finance']
  },
  {
    path: 'cashier',
    component: CashierComponent,
    canActivate: [AuthGuard],
    data: ['cashier']
  },
  {
    path: 'cashier/cart',
    component: CartComponent,
    canActivate: [AuthGuard],
    data: ['cashier']
  },
  {
    path: 'cashier/receipts',
    component: ReceiptsComponent,
    canActivate: [AuthGuard],
    data: ['cashier']
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
