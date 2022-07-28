import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { PersonComponent } from './pages/person/person.component';
import { ProductComponent } from './pages/product/product.component';
import { PersonEditComponent } from './pages/person/person-edit/person-edit.component';
import { ProductEditComponent } from './pages/product/product-edit/product-edit.component';
import { PersonDialogComponent } from './pages/person/person-dialog/person-dialog.component';
import { ProductDialogComponent } from './pages/product/product-dialog/product-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonComponent,
    ProductComponent,
    PersonEditComponent,
    ProductEditComponent,
    PersonDialogComponent,
    ProductDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule, //para uso de forms
    FormsModule //para two-way binding
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
