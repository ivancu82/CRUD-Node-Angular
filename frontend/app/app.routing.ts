import { Routes, RouterModule } from '@angular/router';

import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductFormComponent } from './product-form.component';

const appRoutes: Routes = [
    { path: 'productos', component: ProductListComponent },
    { path: 'productos/new', component: ProductFormComponent },
    { path: 'productos/:id', component: ProductDetailComponent },
    { path: 'productos/edit/:id', component: ProductFormComponent },
    { path: '', redirectTo: 'productos', pathMatch: 'full' },
    { path: '**', redirectTo: 'productos', pathMatch: 'full' }
];

export const routing = RouterModule.forRoot(appRoutes);
