import { Routes } from '@angular/router';
import { CartViewComponent } from './cart/cart-view/cart-view.component';
import { ProductListComponent } from './product/product-list/product-list.component';

export const routes: Routes = [
    { path: '', component: ProductListComponent },
    { path: 'cart', component: CartViewComponent }
];
