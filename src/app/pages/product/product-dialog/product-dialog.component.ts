import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { switchMap } from 'rxjs';
import { Person } from 'src/app/model/person';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})
export class ProductDialogComponent implements OnInit {

  product: Product;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Product,
    private dialogRef: MatDialogRef<ProductDialogComponent>,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.product = { ...this.data };
  }

  delete(idPerson: number){
    this.productService.delete(idPerson).pipe(switchMap( ()=> {
      return this.productService.findAll();
    }))
    .subscribe(data => {
      this.productService.setProductChange(data);
      this.productService.setMessageChange('DELETED!');
    });
    this.close();
  }

  close() {
    this.dialogRef.close();
  }

}
