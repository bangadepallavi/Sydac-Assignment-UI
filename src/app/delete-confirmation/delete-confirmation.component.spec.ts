import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  MatDialogModule,MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { CandidateServiceService } from 'src/services/candidate-service.service';

import { DeleteConfirmationComponent } from './delete-confirmation.component';

describe('DeleteConfirmationComponent', () => {
  let component: DeleteConfirmationComponent;
  let fixture: ComponentFixture<DeleteConfirmationComponent>;
  let dialog:MatDialog;
  let service :CandidateServiceService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MatDialogModule,ReactiveFormsModule, FormsModule,HttpClientModule ],
      
      providers: [
        CandidateServiceService,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ],
      declarations: [ DeleteConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dialog = TestBed.get(MatDialog);
    service=TestBed.get(CandidateServiceService);
  });
  it('should call deleteById by clicking on YES', () => {
    let id=6; 
    let submitButton=fixture.debugElement.query(By.css('.deleteById'));
    fixture.detectChanges();

    submitButton.nativeElement.click();

    expect(component.onConfirmClick).toBeTruthy();
  });
  it('should create', () => { 
    expect(component).toBeTruthy();
  });
});
