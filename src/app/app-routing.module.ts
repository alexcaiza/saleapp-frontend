import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonEditComponent } from './pages/person/person-edit/person-edit.component';
import { PersonComponent } from './pages/person/person.component';
import { ProductEditComponent } from './pages/product/product-edit/product-edit.component';
import { ProductComponent } from './pages/product/product.component';

const routes: Routes = [
  {
    path: 'pages/person', component: PersonComponent, children: [
      { path: 'new', component: PersonEditComponent },
      { path: 'edit/:id', component: PersonEditComponent },
    ],
  },
  {
    path: 'pages/product', component: ProductComponent, children: [
      { path: 'new', component: ProductEditComponent },
      { path: 'edit/:id', component: ProductEditComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
