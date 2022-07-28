import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { Person } from 'src/app/model/person';
import { PersonService } from 'src/app/service/person.service';

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.css']
})
export class PersonEditComponent implements OnInit {

  id: number;
  isEdit: boolean;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private personService: PersonService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'idPerson': new FormControl(0),
      'firstName': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'lastName': new FormControl('', [Validators.required, Validators.minLength(3)])
    });

    this.route.params.subscribe(data => {
      this.id = data['id'];
      this.isEdit = data['id'] != null;
      this.initForm();
    });
  }

  initForm() {
    if (this.isEdit) {

      this.personService.findById(this.id).subscribe(data => {
        this.form = new FormGroup({
          'idPerson': new FormControl(data.idPerson),
          'firstName': new FormControl(data.firstName, [Validators.required, Validators.minLength(3)]),
          'lastName': new FormControl(data.lastName, [Validators.required, Validators.minLength(3)])
        });
      });
    }
  }

  get f() {
    return this.form.controls;
  }

  operate() {
    if (this.form.invalid) { return; }

    let person = new Person();
    person.idPerson = this.form.value['idPerson'];
    person.firstName = this.form.value['firstName'];
    person.lastName = this.form.value['lastName'];

    if (this.isEdit) {
      //UPDATE
      this.personService.update(person).pipe(switchMap(()=>{
        return this.personService.findAll();
      }))
      .subscribe(data => {
        this.personService.personChange.next(data);
        this.personService.setMessageChange("UPDATED!")
      });

    } else {
      //INSERT
      this.personService.save(person).pipe(switchMap(()=>{
        return this.personService.findAll();
      }))
      .subscribe(data => {
        this.personService.personChange.next(data);
        this.personService.setMessageChange("CREATED!")
      });
    }
    this.router.navigate(['/pages/person']);
  }

}
