import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Quote } from '../../_model/quote';
import { FormsModule } from '@angular/forms';
import { QuoteService } from '../../_services/quote.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule],
  
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  quotes: Quote[] = [];

  searchTerm: string = '';
  selectedCategory: string = '';
  selectedStatus: string = '';
  quoteService = inject(QuoteService);
  router = inject(Router);

  ngOnInit(): void {
    this.quotes = this.quoteService.loadQuotes();
  }

  onEdit(id: string) {
    this.router.navigate(['/edit-quote', id]);
  }

  onView(id: string) {
    this.router.navigate(['/quote', id]);
  }

  onDelete(id: string) {
    if (confirm('Biztosan törlöd ezt az idézetet?')) {
      this.quoteService.deleteQuote(id);
      this.quotes = this.quoteService.getAllQuotes();
    }
  }
}
