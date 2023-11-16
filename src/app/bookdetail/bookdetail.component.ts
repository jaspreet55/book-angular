import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../_services/bookservice';
@Component({
  selector: 'app-bookdetail',
  templateUrl: './bookdetail.component.html',
  styleUrls: ['./bookdetail.component.scss']
})
export class BookdetailComponent implements OnInit {
  bookId!: string;
  bookdetail:any = [];
  image!: string;
  constructor( private activatedRoute: ActivatedRoute, private bookService: BookService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param: any) => {
      if (param.Id) {
        this.bookId = param.Id;
        this.bookService.getBookDetail(this.bookId).subscribe((res: any) => {
          console.log(res);
    
          if (res.code == 200) {
            this.bookdetail= res.data.books;
          
          }
        
        }, (err: string) => {
          
        })
      }
    })

  }

}
