import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [NewsListComponent, NewsDetailComponent],
  imports: [SharedModule, RouterModule.forChild([
    { path: '', component: NewsListComponent },
    { path: ':id', component: NewsDetailComponent }
  ])]
})
export class NewsModule {}
