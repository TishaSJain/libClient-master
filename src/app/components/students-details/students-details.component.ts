import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiResponse } from 'src/app/models/api-response';
import { Issue } from 'src/app/models/issue';
import { User } from 'src/app/models/user';
import { IssueService } from 'src/app/service/issueService';
@Component({
  selector: 'app-students-details',
  templateUrl: './students-details.component.html',
  styleUrls: ['./students-details.component.css']
})
export class StudentsDetailsComponent implements OnInit {
  displayedColumns: string[] = ['id','uid', 'name','bid','bname','author','returnDate', 'dueDate','issueDate'];
  dataSource: MatTableDataSource<Issue>;
  issues:Issue[];
  userData: User;
  constructor(private issuesService : IssueService,private router: Router,) {
    this.userData = JSON.parse(localStorage.getItem('userData') || 'null') as User;
    if(this.userData==null){
      this.router.navigate(['/login'])}
      this.issues=[];
   }
  ngOnInit(): void {
  }

  search(input: any){
    this.issues=[]
    this.issuesService.getIssuesByBId(input).subscribe(
      (response: ApiResponse<Issue[]>)=>{
        if(response.success){
          for(let issue of response.data){
            this.issues.unshift(issue);
          }
          this.dataSource = new MatTableDataSource(this.issues)
        }else{
        }
      }
    );
  }
}
