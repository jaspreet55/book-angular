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
  sortProperty: string = 'id';
  sortOrder = 1;
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
  sortBy(property: string) {
    console.log('step1',property);
    this.sortOrder = property === this.sortProperty ? (this.sortOrder * -1) : 1;
    console.log('step2',this.sortOrder);
    this.sortProperty = property;
    this.dataSource = [...this.dataSource.sort((a: any, b: any) => {
        // sort comparison function
        let result = 0;
        if (a[property] < b[property]) {
            result = -1;
        }
        if (a[property] > b[property]) {
            result = 1;
        }
        return result * this.sortOrder;
    })];
}

sortIcon(property: string) {
    if (property === this.sortProperty) {
        return this.sortOrder === 1 ? '↑' : '↓';
    }
    return '';
}

}
