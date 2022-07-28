import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { Person } from 'src/app/model/person';
import { Product } from 'src/app/model/product';
import { PersonService } from 'src/app/service/person.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  id: number;
  isEdit: boolean;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'idProduct': new FormControl(0),
      'name': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'brand': new FormControl('', [Validators.required, Validators.minLength(3)])
    });

    this.route.params.subscribe(data => {
      this.id = data['id'];
      this.isEdit = data['id'] != null;
      this.initForm();
    });
  }

  initForm() {
    if (this.isEdit) {

      this.productService.findById(this.id).subscribe(data => {
        this.form = new FormGroup({
          'idProduct': new FormControl(data.idProduct),
          'name': new FormControl(data.name, [Validators.required, Validators.minLength(3)]),
          'brand': new FormControl(data.brand, [Validators.required, Validators.minLength(3)])
        });
      });
    }
  }

  get f() {
    return this.form.controls;
  }

  operate() {
    if (this.form.invalid) { return; }

    let product = new Product();
    product.idProduct = this.form.value['idProduct'];
    product.name = this.form.value['name'];
    product.brand = this.form.value['brand'];

    if (this.isEdit) {
      //UPDATE
      this.productService.update(product).pipe(switchMap(()=>{
        return this.productService.findAll();
      }))
      .subscribe(data => {
        this.productService.productChange.next(data);
        this.productService.setMessageChange("UPDATED!")
      });

    } else {
      //INSERT
      this.productService.save(product).pipe(switchMap(()=>{
        return this.productService.findAll();
      }))
      .subscribe(data => {
        this.productService.productChange.next(data);
        this.productService.setMessageChange("CREATED!")
      });
    }
    this.router.navigate(['/pages/product']);
  }

}
