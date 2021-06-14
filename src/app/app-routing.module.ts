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
  },
  {
    path: 'owner/employee',
    component: EmployeeComponent,
  },
  {
    path: 'owner/cashflow',
    component: CashflowComponent,
  },
  {
    path: 'owner/top-ten',
    component: TopTenComponent,
  },
  {
    path: 'inventory',
    component: InventoryComponent,
  },
  {
    path: 'inventory/suplier',
    component: SuplierComponent,
  },
  {
    path: 'inventory/order',
    component: OrderComponent,
  },
  {
    path: 'inventory/product',
    component: ProductComponent,
  },
  {
    path: 'cashier',
    component: CashierComponent,
  },
  {
    path: 'finance',
    component: FinanceComponent,
  },
  {
    path: 'finance/outcome',
    component: OutcomeComponent,
  },
  {
    path: 'finance/invoice/:invoice_id',
    component: InvoiceDetailComponent,
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
