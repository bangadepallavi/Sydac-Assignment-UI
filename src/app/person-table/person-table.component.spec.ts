import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonTableComponent } from './person-table.component';
import {  MatDialogModule,MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CandidateServiceService } from 'src/services/candidate-service.service';


describe('PersonTableComponent', () => {
  let component: PersonTableComponent;
  let fixture: ComponentFixture<PersonTableComponent>;
  let service : CandidateServiceService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,ReactiveFormsModule, FormsModule,HttpClientModule
      ],  
      declarations: [ PersonTableComponent ],
      providers: [CandidateServiceService]

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service=TestBed.get(CandidateServiceService);
  });
  // it('should call onEditChannel, open Dialog & call channelSelectedService.updatePost when Edit button is clicked', fakeAsync(() => {
  //   spyOn(service, 'update').and.callThrough();

  //   const editButton = debugElement.query(By.css('button[title=Edit]'));
  //   editButton.triggerEventHandler('click', null);

  //   expect(dialog.open).toHaveBeenCalled();
  //   expect(channelSelectedService.updatePost).toHaveBeenCalledWith(postsMock[0]);
  //   }
  // ));
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
