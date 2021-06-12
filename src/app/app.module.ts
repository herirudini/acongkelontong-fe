import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedComponent } from './_components/shared/shared.component';
import { UserComponent } from './_components/user/user.component';
import { OwnerComponent } from './_components/owner/owner.component';
import { LoginComponent } from './_components/login/login.component';
import { ForgetPasswordComponent } from './_components/login/forget-password/forget-password.component';
import { InventoryComponent } from './_components/inventory/inventory.component';
import { PurchaseOrderComponent } from './_components/inventory/purchase-order/purchase-order.component';
import { FinanceComponent } from './_components/finance/finance.component';
import { InvoiceComponent } from './_components/finance/invoice/invoice.component';
import { TopTenComponent } from './_components/owner/top-ten/top-ten.component';
import { CreateProductComponent } from './_components/inventory/create-product/create-product.component';
import { AddSuplierComponent } from './_components/inventory/add-suplier/add-suplier.component';
import { CreateUserComponent } from './_components/owner/create-user/create-user.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SuplierDetailsComponent } from './_components/inventory/suplier-details/suplier-details.component';
import { CashierComponent } from './_components/cashier/cashier.component';
import { AuthService } from './_services/auth.service';
import { AuthInterceptor } from './_services/auth.interceptor';
import { CashflowComponent } from './_components/owner/cashflow/cashflow.component';
import { ResetPasswordComponent } from './_components/login/reset-password/reset-password.component';
import { DeliveryOrderComponent } from './_components/inventory/delivery-order/delivery-order.component';
import { IncomeComponent } from './_components/finance/income/income.component';
import { OutcomeComponent } from './_components/finance/outcome/outcome.component';
import { ReceiptComponent } from './_components/cashier/receipt/receipt.component';
import { CartComponent } from './_components/cashier/cart/cart.component';
import { PurchaseFormComponent } from './_components/inventory/purchase-form/purchase-form.component';
import { HomeComponent } from './_components/home/home.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormAddToCartComponent } from './_components/cashier/form-add-to-cart/form-add-to-cart.component';
import { ProductListInventoryComponent } from './_components/inventory/product-list-inventory/product-list-inventory.component';
import { ProductListCashierComponent } from './_components/cashier/product-list-cashier/product-list-cashier.component';
import { ProductListComponent } from './_components/shared/product-list/product-list.component';
import { NavbarComponent } from './_components/shared/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    SharedComponent,
    UserComponent,
    OwnerComponent,
    LoginComponent,
    ForgetPasswordComponent,
    InventoryComponent,
    PurchaseOrderComponent,
    FinanceComponent,
    InvoiceComponent,
    TopTenComponent,
    CreateProductComponent,
    AddSuplierComponent,
    CreateUserComponent,
    SuplierDetailsComponent,
    CashierComponent,
    CashflowComponent,
    ResetPasswordComponent,
    DeliveryOrderComponent,
    IncomeComponent,
    OutcomeComponent,
    ReceiptComponent,
    CartComponent,
    PurchaseFormComponent,
    HomeComponent,
    FormAddToCartComponent,
    ProductListComponent,
    ProductListInventoryComponent,
    ProductListCashierComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule
  ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
