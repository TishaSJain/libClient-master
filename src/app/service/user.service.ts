import { Injectable } from '@angular/core';
import {HttpClient,HttpParams} from '@angular/common/http'
import { User } from '../models/user';
import { ApiResponse } from '../models/api-response';
import { NewUser } from '../models/newUser';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url='http://localhost:8080/api/v1'
  constructor(private http: HttpClient) { }
  public userLogin(email:string,pass:string) {
    const data ={
      email: email,
      pass: pass
    }
    return this.http.post<ApiResponse<User>>(`${this.url}/user/login`,data);
  }

  public createUser(newUser: User){
    return this.http.post<ApiResponse<NewUser>>(`${this.url}/user/create`,newUser);
  }

  public changePassword(id: number,newPass:string,currentPass:string) {
    const data ={
     currentPass: currentPass,
      newPass: newPass,
      id:id
    }
    return this.http.post<ApiResponse<string>>(`${this.url}/user/change-password`,data);
  }

  public getUsers(id: number){
    let queryParams = new HttpParams();
    queryParams = queryParams.append("id",id);
    return this.http.get<ApiResponse<NewUser[]>>(`${this.url}/users`,{params:queryParams});
  }
}
