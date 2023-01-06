import { Component, Input, OnInit } from '@angular/core'
import { UtilsService } from '../../../services/utils.service'

@Component({
  selector: 'mc-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})

export class PaginationComponent implements OnInit {
  constructor(private utilsService: UtilsService) {}

  @Input('total') totalProps: number
  @Input('limit') limitProps: number
  @Input('url') urlProps: string
  @Input('currentPage') currentPageProps: number

  pagesCount: number
  pages: number[]

  ngOnInit(): void {
    this.pagesCount = Math.ceil(this.totalProps / this.limitProps)
    this.pages = this.utilsService.range(1, this.pagesCount)
  }
}
