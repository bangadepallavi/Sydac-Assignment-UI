import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {CandidateServiceService} from '../../services/candidate-service.service';
import { first } from 'rxjs/operators';
import {FormBuilder } from '@angular/forms';
import { Observable, pipe } from 'rxjs';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-update-details-form',
  templateUrl: './update-details-form.component.html',
  styleUrls: ['./update-details-form.component.css']
})
export class UpdateDetailsFormComponent implements OnInit {
  candidateForm: any;
  submitted=false;
  disabled=true;
  constructor(private candidateService:CandidateServiceService) { }

  ngOnInit(): void {
   
    this.candidateForm = this.candidateService.loadCandidate();
    this.candidateForm.controls['name'].disable();

  }
  onReset()
  {
    this.candidateForm.reset();
  }
  onSubmit() {
    this.submitted = true;

   
    if (this.candidateForm.invalid) {
        return;
    }

    
    this.candidateService.update(this.candidateForm.value)
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
