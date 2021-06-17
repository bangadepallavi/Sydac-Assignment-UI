import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {FormBuilder } from '@angular/forms';
import { state } from '@angular/animations';
import { first } from 'rxjs/operators';
import {Candidate} from '../../models/candidate';
import { FormsModule } from '@angular/forms';
import {CandidateServiceService} from '../../services/candidate-service.service';
@Component({
  selector: 'app-person-details-form',
  templateUrl: './person-details-form.component.html',
  styleUrls: ['./person-details-form.component.css']
})
export class PersonDetailsFormComponent implements OnInit {
  panelOpenState = true;
  candidateForm: any;
  submitted=false;
  date: string="";
  maxDate = new Date();
  chartData:any[] = [];
  agevalue = 0;

  constructor(private fb: FormBuilder,private candidateService:CandidateServiceService) {
}
  setDate(date: string) {
    this.date = date ? date : "";
    alert(this.date);
  }
  ngOnInit(): void {
    this.candidateForm =new FormGroup({
      name : new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z ]*$')]),
      email: new FormControl('',[Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      mobile: new FormControl('',[Validators.required,Validators.maxLength(10),Validators.minLength(10 ), Validators.pattern("^[0-9]*$")]),
      dob : new FormControl(''),
      age:new FormControl(),
      city : new FormControl('',Validators.pattern('^[a-zA-Z ]*$')),
      state : new FormControl('',Validators.pattern('^[a-zA-Z ]*$')),
      postalCode : new FormControl('',Validators.pattern('^[0-9]*$'))})
  

      for (let i = 0; i < (8 + Math.floor(Math.random() * 10)); i++) {
        this.chartData.push([
          `Index ${i}`,
          Math.floor(Math.random() * 100)
        ]);
      }
  }
  onReset()
  {
    this.candidateForm.reset();
  }
  onSubmit()
   {
      this.submitted = true;

    
      if (this.candidateForm.invalid) {
          return;
      }

      
      this.candidateService.save(this.candidateForm.value)
          .pipe(first())
          .subscribe(
              data => {
                  alert("Successfully registred");
                  window.location.reload();
              },
              error => {
                alert("Unable to registre");
              });
  }

}
