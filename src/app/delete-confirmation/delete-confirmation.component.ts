import { Component, Inject, OnInit } from '@angular/core';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';
import { MAT_SINGLE_DATE_SELECTION_MODEL_FACTORY } from '@angular/material/datepicker';
import {  MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { isNumber } from 'lodash';
import {CandidateServiceService} from '../../services/candidate-service.service';
@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.css']
})
export class DeleteConfirmationComponent implements OnInit {
  message: string = "Are you sure, you want to delete?"
  confirmButtonText = "Yes"
  cancelButtonText = "Cancel"
  isDeleted=false
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
  private dialogRef: MatDialogRef<DeleteConfirmationComponent>,private candidateService:CandidateServiceService) { 
    
  }
  ngOnInit(): void {
  }
  onConfirmClick(): void {
    if( isNumber(this.data))
    {
          this.candidateService.deleteById(this.data).subscribe((res)=>{         
              this.isDeleted=true;
              window.location.reload();
            })
    }
    else{
      console.log("data to be deleted " ,this.data)
      this.data.forEach((element: { id: number; }) => {
        this.candidateService.deleteById(element.id).subscribe((res)=>{         
        })
      });      
      window.location.reload();
    }
    alert("Candidate deleted successfully")
    this.dialogRef.close();
  }

}
