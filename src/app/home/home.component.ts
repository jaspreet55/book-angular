import { Component, OnInit } from '@angular/core';
import { BookService } from '../_services/bookservice';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dataSource: any = [];
  serverError = "";
  searchForm: FormGroup;
  currentPage = 1;
  totalPages!: number;
  constructor(
    private bookService: BookService,
    private fb: FormBuilder,
  ) {
    this.searchForm = this.fb.group({
      title: [''],
      author: [''],
      publisher: [''],
      genre: [''],
      isbn: [''],
      // Add more form controls as needed
    });
   }

  ngOnInit(): void {
    this.loadData(this.currentPage);
  }

  loadData(page: number) {
    this.dataSource= [];
    this.bookService.getAllBookList(page).subscribe((res: any) => {
      console.log(res);

      if (res.code == 200) {
        res.data.books.data.forEach((d: any, i: any) => {
          this.dataSource.push(d);
        })
      }
      this.currentPage =  res.data.books.current_page;
      this.totalPages =  res.data.books.last_page;
    
    }, (err: string) => {
      this.serverError = err;
    })
  }

  search() {
    const queryParams = this.searchForm.value;

    // Remove empty values from the query parameters
    Object.keys(queryParams).forEach(
      (key) => queryParams[key] === '' && delete queryParams[key]
    );

    this.bookService.fetchData(queryParams,this.currentPage).subscribe((res: any) => {
      console.log(res);
     if (res.code == 200) {
      this.dataSource =[];
        res.data.books.data.forEach((d: any, i: any) => {
          this.dataSource.push(d);
        })
      }
    });
  }
}
