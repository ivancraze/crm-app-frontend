import { Component, Input, OnInit } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { getFeedAction } from '../store/actions/getFeed.action'
import { Observable } from 'rxjs'

import { GetFeedResponseInterface } from '../types/getFeedResponse.interface'
import { errorSelector, feedSelector, isLoadingSelector } from '../store/selectors'

@Component({
  selector: 'mc-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})

export class FeedComponent implements OnInit {
  constructor(private store: Store) {}

  @Input('apiUrl') apiUrlProps: string

  isLoading$: Observable<boolean>
  error$: Observable<string | null>
  feed$: Observable<GetFeedResponseInterface | null>

  ngOnInit(): void {
    this.initializeValues()
    this.fetchData()
  }

  initializeValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.error$ = this.store.pipe(select(errorSelector))
    this.feed$ = this.store.pipe(select(feedSelector))
  }

  fetchData(): void {
    this.store.dispatch(getFeedAction({url: this.apiUrlProps}))
  }
}
