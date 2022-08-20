import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiResponse } from 'src/app/models/api-response';
import { Issue } from 'src/app/models/issue';
import { User } from 'src/app/models/user';
import { IssueService } from 'src/app/service/issueService';

@Component({
  selector: 'app-books-issued-admin',
  templateUrl: './books-issued-admin.component.html',
  styleUrls: ['./books-issued-admin.component.css']
})
export class BooksIssuedAdminComponent implements OnInit {
  displayedColumns: string[] = ['id','uid','bid', 'bname','author','returnDate', 'dueDate','issueDate','name'];
  dataSource: MatTableDataSource<Issue>;
  issues:Issue[];
  userData: User;
  issuesDisplayed:Issue[];
  constructor(private issuesService : IssueService,private router: Router,) {
    this.userData = JSON.parse(localStorage.getItem('userData') || 'null') as User;
    if(this.userData==null){
      this.router.navigate(['/login'])}
   }

  ngOnInit(): void {
    this.issues=[];
    this.issuesDisplayed=this.issues;
    this.issuesService.getIssues().subscribe(
      (response: ApiResponse<Issue[]>)=>{
        if(response.success){
          for(let issue of response.data){
            this.issues.unshift(issue);
          }
          this.issuesDisplayed=this.issues
          this.dataSource = new MatTableDataSource(this.issuesDisplayed)
        }else{
        }
      }
    );
  }

  search(input: any){
    if(input==''){
      this.issuesDisplayed=this.issues;
    }else{
      this.issuesDisplayed=[];
      for(let issue of this.issues){
        if(issue.user!.uid!.toString().match(input)){
         this.issuesDisplayed.unshift(issue);
        }
      }
    }
    this.dataSource= new MatTableDataSource(this.issuesDisplayed);
  }
}
