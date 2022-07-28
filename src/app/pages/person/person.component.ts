import { Component, OnInit, ViewChild } from '@angular/core';
import { Person } from 'src/app/model/person';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { switchMap } from 'rxjs';
import { PersonService } from 'src/app/service/person.service';
import { ActivatedRoute } from '@angular/router';
import { PersonDialogComponent } from './person-dialog/person-dialog.component';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  patients: Person[];

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'actions'];
  dataSource: MatTableDataSource<Person>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private personService: PersonService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.personService.personChange.subscribe(data => {
      this.createTable(data);
    });

    this.personService.getMessageChange().subscribe(data => {
      this.snackBar.open(data, 'INFO', { duration: 2000, verticalPosition: "bottom", horizontalPosition: "center" });
    });

    this.personService.findAll().subscribe(data => {
      this.createTable(data);
    });
  }

  applyFilter(e: any) {
    this.dataSource.filter = e.target.value.trim().toLowerCase();
  }

  delete(idPatient: number){
    this.personService.delete(idPatient).pipe(switchMap( ()=> {
      return this.personService.findAll();
    }))
    .subscribe(data => {
      this.personService.personChange.next(data);
      this.personService.setMessageChange('DELETED!');
    })
    ;
  }

  createTable(patients: Person[]){
    this.dataSource = new MatTableDataSource(patients);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  checkChildren(): boolean{
    return this.route.children.length != 0;
  }

  openDialog(person?: Person){
    this.dialog.open(PersonDialogComponent, {
      width: '400px',
      data: person
    });
  }
}
