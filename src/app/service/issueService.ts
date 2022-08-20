import { Injectable } from '@angular/core';
import {HttpClient,HttpParams} from '@angular/common/http'
import { ApiResponse } from '../models/api-response';
import { Issue } from '../models/issue';
@Injectable({
  providedIn: 'root'
})
export class IssueService {

  private url='http://localhost:8080/api/v1'
  constructor(private http: HttpClient) { }

  public getIssues() {
    return this.http.get<ApiResponse<Issue[]>>(`${this.url}/issues`);
  }

  public getIssuesById(uid: number) {
    const params = new HttpParams({
        fromString: `uid=${uid}`
      });
  
    return this.http.get<ApiResponse<Issue[]>>(`${this.url}/issues/user?${params}`);
  }

  public getIssuesByBId(bid: number) {
    const params = new HttpParams({
        fromString: `bid=${bid}`
      });
  
    return this.http.get<ApiResponse<Issue[]>>(`${this.url}/issues/book?${params}`);
  }

  public returnBookById(id: number) {
    const params = new HttpParams({
        fromString: `id=${id}`
      });
  
    return this.http.post<ApiResponse<string>>(`${this.url}/issues/return?${params}`,[]);
  }

  public addIssue(uid: number,bid: number) {
    const params = new HttpParams({
        fromString: `uid=${uid}&bid=${bid}`
      });
  
    return this.http.post<ApiResponse<string>>(`${this.url}/issues/add?${params}`,{});
  }
}
