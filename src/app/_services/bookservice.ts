import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })

export class BookService {
  
  constructor(private http: HttpClient) { }
  

  getAllBookList(page:any) {
    return this.http.get(`${environment.apiUrl}/book/list?page=`+page);
  }
  fetchData(queryParams: any,page:any): Observable<any> {
    // console.log(queryParams);
    return this.http.get(`${environment.apiUrl}/search/book?page=`+page, { params: queryParams });
  }

  getBookDetail(id:any) {
    return this.http.get(`${environment.apiUrl}/book/detail/`+id);
  }
}