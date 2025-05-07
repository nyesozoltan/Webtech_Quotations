import { inject, Injectable } from "@angular/core";
import { Quote } from "../_model/quote";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, tap } from "rxjs";

const STORAGE_KEY = 'my-quotes';

@Injectable({providedIn: 'root'})

export class QuoteService {
  http = inject(HttpClient);  

  private quotes: Quote[] = [];
  private readonly localStorageKey = 'quotes';

  loadInitialQuotes(): Observable<Quote[]> {
    return this.http.get<Quote[]>('quotes.json').pipe(
        tap((data: Quote[]) => this.quotes = data)
    );
  }

  loadQuotes(): Quote[] {    
    const storedQuotes = localStorage.getItem(this.localStorageKey);
    
    if (storedQuotes) {      
      this.quotes = JSON.parse(storedQuotes);
      console.log('Idézetek betöltve localStorage-ból:', this.quotes);
    } if(this.quotes.length === 0) { 
        this.loadInitialQuotes().subscribe((quotes) => {
        this.quotes = quotes;
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.quotes));
        console.log('Idézetek betöltve JSON-ból:', quotes);
      });           
    }
    return this.quotes
  }

  getAllQuotes(): Quote[] {
    return this.quotes;
  }

  getQuoteById(id: string): Quote | undefined {
    return this.quotes.find(q => q.id === id);
  }

  addQuote(quote: Quote): void {
    this.quotes.push(quote);
    this.saveQuotes();
  }

  updateQuote(updated: Quote): void {
    const index = this.quotes.findIndex(q => q.id === updated.id);
    if (index !== -1) {
      this.quotes[index] = updated;
      this.saveQuotes();
    }
  }

  deleteQuote(id: string): void {
    this.quotes = this.quotes.filter(q => q.id !== id);
    this.saveQuotes();
  }

  private saveQuotes(): void {     
      localStorage.setItem(this.localStorageKey, JSON.stringify(this.quotes));
      console.log('Idézetek mentve a localStorage-ba:', this.quotes);
    }
}