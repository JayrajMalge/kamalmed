import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { News } from '../../../core/models/hospital.models';

@Component({ selector: 'app-news-detail', templateUrl: './news-detail.component.html' })
export class NewsDetailComponent implements OnInit {
  news: News | null = null;
  loading = true;
  constructor(private route: ActivatedRoute, private api: ApiService) {}
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.api.getNewsItem(id).subscribe({ next: n => { this.news = n; this.loading = false; }, error: () => this.loading = false });
  }
  getImageUrl(path: string | undefined): string { return path ? `/uploads/${path}` : ''; }
}
