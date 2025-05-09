import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Quote, Category, Mood, CATEGORY_OPTIONS, MOOD_OPTIONS } from '../../_model/quote';
import { QuoteService } from '../../_services/quote.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  quotes: Quote[] = [];
  loggedInUser = localStorage.getItem('role') ?? 'ismeretlen';
  searchTerm: string = '';
  deleteMessage: string = '';
  selectedCategory: Category | '' = '';
  selectedMood: Mood | '' = '';

  categoryOptions = CATEGORY_OPTIONS;
  moodOptions = MOOD_OPTIONS;

  quoteService = inject(QuoteService);
  router = inject(Router);

  ngOnInit(): void {
    this.quotes = this.quoteService.loadQuotes();
  }

  get filteredQuotes(): Quote[] {
    return this.quotes.filter(quote =>
      quote.text.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
      (this.selectedCategory ? quote.categories === this.selectedCategory : true) &&
      (this.selectedMood ? quote.mood === this.selectedMood : true)
    );
  }
  
  clearFilters(): void {
    this.selectedCategory = '';
    this.selectedMood = '';
  }

  logout() {
  localStorage.removeItem('role');
  this.router.navigate(['/login']);
  }

  onEdit(id: string): void {
    this.router.navigate(['/edit-quote', id]);
  }

  onView(id: string): void {
    this.router.navigate(['/quote', id]);
  }

  onDelete(id: string): void {
    if (confirm('Biztosan törlöd ezt az idézetet?')) {
      this.quoteService.deleteQuote(id);
      this.quotes = this.quoteService.getAllQuotes();
    }
  }

  deleteAllQuotes(): void {
    if (confirm('Biztosan törölni szeretnéd az összes idézetet? Ez nem visszavonható.')) {
      localStorage.removeItem('quotes');
      this.quotes = [];
      this.deleteMessage = 'Az összes idézet sikeresen törölve lett.';

    // üzenet eltüntetése 3 másodperc után
    setTimeout(() => {
      this.deleteMessage = '';
    }, 3000);
  }
}
}