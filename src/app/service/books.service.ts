import { Injectable } from '@angular/core';
import {HttpClient,HttpParams} from '@angular/common/http'
import { Books } from '../models/books';
import { ApiResponse } from '../models/api-response';
@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private url='http://localhost:8080/api/v1'
  constructor(private http: HttpClient) { }

  public getBooks() {
    return this.http.get<ApiResponse<Books[]>>(`${this.url}/books`);
  }

  public addBook(book:Books) {
    return this.http.post<ApiResponse<Books>>(`${this.url}/books/add`,book);
  }
}
