import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  template: `
    <nav *ngIf="totalPages > 1">
      <ul class="pagination">
        <li class="page-item" [class.disabled]="currentPage === 1">
          <a class="page-link" (click)="goToPage(1)" aria-label="First">
            <span aria-hidden="true">&laquo;&laquo;</span>
          </a>
        </li>
        <li class="page-item" [class.disabled]="currentPage === 1">
          <a class="page-link" (click)="goToPage(currentPage - 1)" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item" *ngFor="let page of getPages()">
          <a class="page-link" (click)="goToPage(page)" [class.active]="currentPage === page">
            {{ page }}
          </a>
        </li>
        <li class="page-item" [class.disabled]="currentPage === totalPages">
          <a class="page-link" (click)="goToPage(currentPage + 1)" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
        <li class="page-item" [class.disabled]="currentPage === totalPages">
          <a class="page-link" (click)="goToPage(totalPages)" aria-label="Last">
            <span aria-hidden="true">&raquo;&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  `,
  styles: []
})
export class PaginationComponent {
  @Input()
  currentPage!: number;
  @Input()
  totalPages!: number;

  @Output() pageChange = new EventEmitter<number>();

  getPages(): number[] {
    const pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.pageChange.emit(page);
    }
  }
}