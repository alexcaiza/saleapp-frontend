import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Person } from '../model/person';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class PersonService extends GenericService<Person>{

  personChange = new Subject<Person[]>;
  private messageChange = new Subject<string>;

  constructor(protected override http: HttpClient) {
    super(
      http,
      `${environment.HOST}/persons`
      );
  }

  //////////get set/////////////
  setPersonChange(list: Person[]){
    this.personChange.next(list);
  }

  getPersonChange(){
    return this.personChange.asObservable();
  }

  setMessageChange(message: string){
    this.messageChange.next(message);
  }

  getMessageChange(){
    return this.messageChange.asObservable();
  }
}
