import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { EffectsModule } from '@ngrx/effects'

import { FeedComponent } from './components/feed.component'
import { GetFeedEffect } from './store/effects/getFeed.effect'

@NgModule({
  imports: [CommonModule, EffectsModule.forFeature([GetFeedEffect])],
  declarations: [FeedComponent],
  exports: [FeedComponent]
})

export class FeedModule {}
