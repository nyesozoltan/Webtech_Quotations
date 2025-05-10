import { Component, OnInit } from '@angular/core';
import { QuoteService } from '../../_services/quote.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-statistics',
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-statistics.component.html',
  styleUrls: ['./admin-statistics.component.css']
})
export class AdminStatisticsComponent implements OnInit {
  categoryStats: any[] = [];
  authorStats: any[] = [];
  moodStats: any[] = [];

  constructor(
    private quoteService: QuoteService,
    public router: Router
  ) {}

ngOnInit(): void {
  const quotes = this.quoteService.getAllQuotes();
  this.categoryStats = this.countBy(quotes, 'categories');
  this.authorStats = this.countBy(quotes, 'author');
  this.moodStats = this.countBy(quotes, 'mood');
}

  private countBy(list: any[], key: string): { key: string, count: number }[] {
    const result: { [key: string]: number } = {};
    for (let item of list) {
      result[item[key]] = (result[item[key]] || 0) + 1;
    }
    return Object.entries(result).map(([key, count]) => ({ key, count }));
  }
}