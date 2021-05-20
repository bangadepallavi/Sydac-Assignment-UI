import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { Observable,throwError  } from 'rxjs';
import { Candidate } from '../models/candidate';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import * as _ from 'lodash';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class CandidateServiceService {
  url='http://localhost:8080/api';
  candidateForm =new FormGroup({
    id:new FormControl('')   ,
    name : new FormControl('',Validators.required)   ,
    email: new FormControl('',Validators.email),
    mobile: new FormControl('',[Validators.required,Validators.maxLength(10),Validators.minLength(10 )]),
    dob : new FormControl(''),
    age:new FormControl(),
    city : new FormControl(''),
    state : new FormControl(''),
    postalCode : new FormControl('')
  })
  // this.url='http://localhost:8080/api';
  constructor(private http:HttpClient) {
    
   }

   public findAll():Observable<Candidate[]>{
    return this.http.get<Candidate[]>(this.url+"/get").pipe(
      catchError(this.erroHandler));
  }

  erroHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'server Error');
  }
  public save(candidate:Candidate){
    return this.http.post<Candidate>(this.url+"/add",candidate).pipe(
      catchError(this.erroHandler));;
  }
  public update(candidate:Candidate){
    console.log(candidate.id);
    return this.http.put<Candidate>(this.url+"/update/"+Number(candidate.id),candidate).pipe(
      catchError(this.erroHandler));;
  }
/*  public findById(id:number):Observable<Candidate>{
    return this.http.get<Candidate>(this.url+"/get/"+id);
    }
*/
  public deleteById(candidate_id:number){
    return this.http.delete(this.url+"/delete/"+Number(candidate_id)).pipe(
      catchError(this.erroHandler));;
  }

  populateForm(candidate:any) {
    console.log(candidate);
    this.candidateForm.setValue(candidate);
  }
  loadCandidate() {
    return this.candidateForm;
  }
}
