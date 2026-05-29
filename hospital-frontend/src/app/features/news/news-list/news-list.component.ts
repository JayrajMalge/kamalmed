import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { News } from '../../../core/models/hospital.models';

@Component({ selector: 'app-news-list', templateUrl: './news-list.component.html' })
export class NewsListComponent implements OnInit {
  news: News[] = [];
  filtered: News[] = [];
  activeType = 'All';
  types = ['All', 'News', 'Blog'];
  loading = true;

  constructor(private api: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(p => {
      if (p['type']) this.activeType = p['type'];
    });
    this.api.getNews().subscribe({ next: n => {
      this.news = n; this.filter(this.activeType); this.loading = false;
    }, error: () => this.loading = false });
  }

  filter(type: string): void {
    this.activeType = type;
    this.filtered = type === 'All' ? this.news : this.news.filter(n => n.newstype === type);
  }
  getImageUrl(path: string | undefined): string { return path ? `/uploads/${path}` : ''; }
}
