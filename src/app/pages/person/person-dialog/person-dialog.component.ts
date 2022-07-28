import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { switchMap } from 'rxjs';
import { Person } from 'src/app/model/person';
import { PersonService } from 'src/app/service/person.service';

@Component({
  selector: 'app-person-dialog',
  templateUrl: './person-dialog.component.html',
  styleUrls: ['./person-dialog.component.css']
})
export class PersonDialogComponent implements OnInit {

  person: Person;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Person,
    private dialogRef: MatDialogRef<PersonDialogComponent>,
    private personService: PersonService
  ) { }

  ngOnInit(): void {
    this.person = { ...this.data };
  }

  delete(idPerson: number){
    this.personService.delete(idPerson).pipe(switchMap( ()=> {
      return this.personService.findAll();
    }))
    .subscribe(data => {
      this.personService.setPersonChange(data);
      this.personService.setMessageChange('DELETED!');
    });
    this.close();
  }

  close() {
    this.dialogRef.close();
  }

}
