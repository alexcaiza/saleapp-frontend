import { Component, OnInit, ViewChild } from '@angular/core';
import { Person } from 'src/app/model/person';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs';
import { PersonService } from 'src/app/service/person.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: Product[];

  displayedColumns: string[] = ['id', 'name', 'brand', 'actions'];
  dataSource: MatTableDataSource<Product>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.productService.productChange.subscribe(data => {
      this.createTable(data);
    });

    this.productService.getMessageChange().subscribe(data => {
      this.snackBar.open(data, 'INFO', { duration: 2000, verticalPosition: "bottom", horizontalPosition: "center" });
    });

    this.productService.findAll().subscribe(data => {
      this.createTable(data);
    });
  }

  applyFilter(e: any) {
    this.dataSource.filter = e.target.value.trim().toLowerCase();
  }

  delete(idProduct: number){
    this.productService.delete(idProduct).pipe(switchMap( ()=> {
      return this.productService.findAll();
    }))
    .subscribe(data => {
      this.productService.productChange.next(data);
      this.productService.setMessageChange('DELETED!');
    })
    ;
  }

  createTable(products: Product[]){
    this.dataSource = new MatTableDataSource(products);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  checkChildren(): boolean{
    return this.route.children.length != 0;
  }

  openDialog(product?: Product){
    this.dialog.open(ProductDialogComponent, {
      width: '400px',
      data: product
    });
  }
}
