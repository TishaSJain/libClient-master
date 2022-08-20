import { Component, OnInit,ViewChild,AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiResponse } from 'src/app/models/api-response';
import { Issue } from 'src/app/models/issue';
import { User } from 'src/app/models/user';
import { IssueService } from 'src/app/service/issueService';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-books-issued',
  templateUrl: './books-issued.component.html',
  styleUrls: ['./books-issued.component.css']
})
export class BooksIssuedComponent implements OnInit {
  bookReturned:string
  displayedColumns: string[] = ['id', 'bname','author','publisher', 'returnDate', 'dueDate','issueDate','action'];
  dataSource: MatTableDataSource<Issue>;
  @ViewChild(MatSort) sort: MatSort;
  issues:Issue[];
  issuesDisplayed:Issue[];
  userData: User;
  constructor(private issuesService : IssueService,private router: Router) { 
    this.userData = JSON.parse(localStorage.getItem('userData') || 'null') as User;
    if(this.userData==null){
      this.router.navigate(['/login'])}
  }

  ngOnInit(): void {
    this.issues=[];
    this.issuesDisplayed=this.issues;
    this.issuesService.getIssuesById(this.userData.uid!).subscribe(
      (response: ApiResponse<Issue[]>)=>{
        if(response.success){
          for(let issue of response.data){
            this.issues.unshift(issue);
          }
          this.issuesDisplayed=this.issues
          this.dataSource = new MatTableDataSource(this.issuesDisplayed)
          this.dataSource.sort=this.sort
console.log(this.issuesDisplayed.length==0)
        }else{
        }
      }
    );
  }

  returnBook(id: number){
        this.issuesService.returnBookById(id).subscribe({
          next:(response: ApiResponse<string>)=>{
            if(response.data){
              this.bookReturned=response.data
              setTimeout(() => {
                location.reload()
              }, 1000);
            }else{
              this.bookReturned=response.errorMessage
            }
          },
          error:()=>{
                alert("Error while returning book!")
          }
        })
  }
  closedAlert(){
    this.bookReturned=''
  }

  handleChange(type: number) {
    if(type==1){
      this.callAllIssues()
    }else{
      this.overdueIssues()
    }
  }
  callAllIssues(){
   this.issuesDisplayed=this.issues
   this.dataSource=new MatTableDataSource(this.issuesDisplayed)
  }

overdueIssues(){
  this.issuesDisplayed=[]
  for(let issue of this.issues){
    var today = new Date();
    const [day, month, year] = issue.dueDate.split('-');
    var dueDate = new Date(+year,+month-1,+day)
    if(issue.returnDate==null){
      if(today>dueDate){
        this.issuesDisplayed.unshift(issue)
      }
    }
  }
  this.dataSource=new MatTableDataSource(this.issuesDisplayed)
 }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }
}
