import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CashierComponent } from './_components/cashier/cashier.component';
import { FinanceComponent } from './_components/finance/finance.component';
import { InventoryComponent } from './_components/inventory/inventory.component';
import { CreateUserComponent } from './_components/owner/create-user/create-user.component';
import { OwnerComponent } from './_components/owner/owner.component';
import { LoginComponent } from './_components/login/login.component';
import { AuthGuard } from './_services/auth.guard';
import { ForgetPasswordComponent } from './_components/login/forget-password/forget-password.component';
import { ResetPasswordComponent } from './_components/login/reset-password/reset-password.component';
import { HomeComponent } from './_components/home/home.component';

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
    path: 'owner/create-user',
    component: CreateUserComponent,
  },
  {
    path: 'inventory',
    component: InventoryComponent,
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
