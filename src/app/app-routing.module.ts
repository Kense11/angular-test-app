import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoPageComponent } from './info-page/info-page.component';
import { CartComponent } from './cart/cart.component';


const routes: Routes = [
  { path: '', redirectTo: '/info', pathMatch: 'full' },
  { path: 'info', component: InfoPageComponent },
  { path: 'cart', component: CartComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
