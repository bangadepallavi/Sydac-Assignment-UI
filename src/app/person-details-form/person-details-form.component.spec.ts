import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';


import { PersonDetailsFormComponent } from './person-details-form.component';

describe('PersonDetailsFormComponent', () => {
  let component: PersonDetailsFormComponent;
  let fixture: ComponentFixture<PersonDetailsFormComponent>;
  let submitBtn: HTMLButtonElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule,HttpClientModule],
      declarations: [ PersonDetailsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Form invalid when empty', () => {
    expect(component.candidateForm.valid).toBeFalsy();
  });

  it('Check whether email is invalid',()=>{
    let errors = {};
    let email=component.candidateForm.controls['email'];
    expect(email.valid).toBeFalsy();
    expect(email.errors['required']).toBeTruthy();
    errors = email.errors || {};
    email.setValue('abc@gmail.com');
    expect(email.hasError('email')).toBeFalsy();
  });

  it('Name field validation check',()=>{
    let errors = {};
    let name=component.candidateForm.controls['name'];
    expect(name.valid).toBeFalsy();
    expect(name.errors['required']).toBeTruthy();
    errors = name.errors || {};
    name.setValue('xyz');
    expect(name.hasError('pattern')).toBeFalsy();
    expect(name.valid).toBeTrue();
  });

  it('Mobile field validity', () => {
    const mobile = component.candidateForm.controls['mobile'];
    expect(mobile.valid).toBeFalsy();
    expect(mobile.hasError('required')).toBeTruthy();
    mobile.setValue(7877584866);
    expect(mobile.hasError('minLength')).toBeFalsy();
    expect(mobile.hasError('pattern')).toBeFalsy();
    expect(mobile.hasError('maxLength')).toBeFalsy();
  });
  
  it('DOB should not be greater that current date', () => {
    const dob = component.candidateForm.controls['dob'];
    console.log(dob )
    let curr_date=new Date();
    console.log(curr_date);
    dob.setValue("2021-08-08T00:00:00.000Z");
    expect(dob.value).toBeTruthy();
    
  });

  it('City field validation check',()=>{
    let city=component.candidateForm.controls['city'];
    expect(city.valid).toBeTruthy();
    city.setValue('Pune');
    expect(city.hasError('pattern')).toBeFalsy();
    expect(city.valid).toBeTrue();
  });

  it('State field validation check',()=>{
    let state=component.candidateForm.controls['state'];
    expect(state.valid).toBeTruthy();
    state.setValue('Maharashtra');
    expect(state.hasError('pattern')).toBeFalsy();
    expect(state.valid).toBeTrue();
  });

  it('Postal code field validation check',()=>{
    let postalCode=component.candidateForm.controls['postalCode'];
    expect(postalCode.valid).toBeTruthy();
    postalCode.setValue("478898");
    expect(postalCode.hasError('pattern')).toBeFalsy();
  });


  it('Check submitBtn is disabled initially', () => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      debugger;
      submitBtn = fixture.debugElement.query(By.css('.submitButton')).nativeElement;

      fixture.detectChanges();
      expect(submitBtn.disabled).toBe(true)
     })
  });
  it('should check submitBtn is enabled after inputs check out', () => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      submitBtn = fixture.debugElement.query(By.css('.submitButton')).nativeElement;
      
      component.candidateForm.controls['name'].setValue("xyz");
      component.candidateForm.controls['email'].setValue("abc@gmail.com");
      component.candidateForm.controls['mobile'].setValue(7878558798);
      fixture.detectChanges();
      expect(submitBtn.disabled).toBe(false)
    });
  });
  it('Should create', () => {
    expect(component).toBeTruthy();
  });
});
