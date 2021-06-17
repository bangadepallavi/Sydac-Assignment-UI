import { Component, OnInit } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { PersonDetailsFormComponent } from 'src/app/person-details-form/person-details-form.component';
import { UpdateDetailsFormComponent } from 'src/app/update-details-form/update-details-form.component';
import { DeleteConfirmationComponent } from 'src/app/delete-confirmation/delete-confirmation.component';
import {Candidate} from '../../models/candidate';
import {CandidateServiceService} from '../../services/candidate-service.service';
import {SelectionModel} from '@angular/cdk/collections';  
import {MatSort} from '@angular/material/sort';
@Component({
  selector: 'app-person-table',
  templateUrl: './person-table.component.html',
  styleUrls: ['./person-table.component.css']
})
export class PersonTableComponent implements OnInit {
  listData!: MatTableDataSource<any>;
  selection = new SelectionModel < any > (true, []);  
  data:any;
  dataList:any[]=[];
  displayedColumns: string[] = ['id', 'name', 'mobile', 'age', 'email','city','dob','customColumn1','customColumn2'];
  listCandidate:CandidateInterface[]=[];   
  panelOpenState = true;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;


  constructor(    private dialog: MatDialog, private candidateService:CandidateServiceService
    ) { }
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.listData.filter = filterValue.trim().toLowerCase();
  
      if (this.listData.paginator) {
        this.listData.paginator.firstPage();
      }
    }
  
    getCandidateData()
    {
      this.candidateService.findAll().subscribe((res)=>{
        this.listCandidate=res
        this.listData = new MatTableDataSource(this.listCandidate);
        this.listData.paginator = this.paginator;
        this.listData.sort = this.sort;
     
        console.log(this.listCandidate)
      })
      
    }
    ngOnInit(): void {
      this.getCandidateData();
   }
   onEdit(row:any){
    this.candidateService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.height = "60%";
    this.dialog.open(UpdateDetailsFormComponent,dialogConfig);
   }
   onSingleDelete(id:any) {

    const numSelected = this.selection.selected;  
    if (numSelected.length > 0) {   
      console.log(numSelected.length); 
    } 
    console.log(id);
    const dialogRef = this.dialog.open(DeleteConfirmationComponent,{
      data:id
    });
  }
  onMultipleDelete(){
    this.data = Object.assign( this.listCandidate);
    this.selection.selected.forEach(item => {
      this.dataList.push(item);
      let index: number = this.data.findIndex((d: any) => d === item);
      this.listData = new MatTableDataSource<any>(this.data);
      // window.location.reload();
    });
    
    const dialogRef = this.dialog.open(DeleteConfirmationComponent,{
      data:this.dataList
    });
  }
  removeSelectedRows() {
    this.data = Object.assign( this.listCandidate);
    this.selection.selected.forEach(item => {
      this.dataList.push(item);
      let index: number = this.data.findIndex((d: any) => d === item);
      console.log(this.data.findIndex((d: any) => d === item));
      this.data.splice(index,1)
      this.listData = new MatTableDataSource<any>(this.data);
      // window.location.reload();
    });
    console.log("Data to be delete",this.dataList);
    this.selection = new SelectionModel<any>(true, []);
  }

  onbluckDelete(){
    
  }
  isAllSelected(){
    const numSelected = this.selection.selected.length;
    const numRows = this.listData.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.listData.data.forEach(row => this.selection.select(row));
  }
}
export interface CandidateInterface {
  id : number;
  name : string;
  mobile : number;
  age : number;
  email : string;
	city : string;
	dob : string;
  state : string; 
	postalCode : number;
}   
