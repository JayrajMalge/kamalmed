import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebClientService } from '../../services/web-client.service';

@Component({
  selector: 'app-news-blogs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news-blogs.component.html',
  styleUrl: './news-blogs.component.css'
})
export class NewsBlogsComponent implements OnInit {
  items: any[] = [];
  selectedItem: any = null;
  activeTab: 'news' | 'blog' = 'news';
  loading = true;
  showModal = false;

  constructor(private webClient: WebClientService) {}

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.loading = true;
    this.webClient.get<any[]>(`api/news?type=${this.activeTab}`).subscribe({
      next: (data) => {
        this.items = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading news/blogs:', err);
        this.loading = false;
      }
    });
  }

  switchTab(tab: 'news' | 'blog') {
    if (this.activeTab !== tab) {
      this.activeTab = tab;
      this.loadItems();
    }
  }

  selectItem(item: any) {
    this.selectedItem = item;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedItem = null;
  }
}
