import { Component } from '@angular/core';
import { Quote } from '../../_model/quote';
import { ActivatedRoute, Router } from '@angular/router';
import { QuoteService } from '../../_services/quote.service';

@Component({
  selector: 'app-quotation-details',
  standalone: true,
  imports: [],
  templateUrl: './quotation-details.component.html',
  styleUrl: './quotation-details.component.css'
})
export class QuotationDetailsComponent {
  quote!: Quote

  constructor(
    private route: ActivatedRoute,
    private quoteService: QuoteService,
    public router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const found = this.quoteService.getQuoteById(id);
      if (!found) {
        alert('Az idézet nem található.');
        this.router.navigate(['/']);
        return;
      }
      this.quote = found;
    }
  }
}