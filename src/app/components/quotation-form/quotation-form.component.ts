import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { QuoteService } from '../../_services/quote.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CATEGORY_OPTIONS, MOOD_OPTIONS, Quote, Mood, Category } from '../../_model/quote';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quote-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './quotation-form.component.html',
  styleUrl: './quotation-form.component.css'
})
export class QuotationFormComponent {
  form!: FormGroup;
  isEdit = false;
  quoteId?: string;
  moodOptions: Mood[] = MOOD_OPTIONS;
  categoryOptions: Category[] = CATEGORY_OPTIONS;

  constructor(
    private fb: FormBuilder,
    private quoteService: QuoteService,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      text: ['', Validators.required],
      author: ['', Validators.required],
      source: ['', Validators.required],
      categories: [this.categoryOptions[0], Validators.required],
      mood: [this.moodOptions[0], Validators.required],
    });

    this.quoteId = this.route.snapshot.paramMap.get('id') || undefined;    

    if (this.quoteId) {
      const quote = this.quoteService.getQuoteById(this.quoteId);
      if (quote) {
        this.isEdit = true;
        this.form.patchValue(quote);
      } else {
        alert('Az idézet nem található.');
        this.router.navigate(['/dashboard']);
      }
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const formValue = this.form.value as Omit<Quote, 'id'>;

    if (this.isEdit && this.quoteId) {
      const updatedQuote: Quote = { id: this.quoteId, ...formValue };
      this.quoteService.updateQuote(updatedQuote);
    } else {
      const newQuote: Quote = { id: crypto.randomUUID(), ...formValue };
      this.quoteService.addQuote(newQuote);
    }

    this.router.navigate(['/dashboard']);
  }

  onCancel(): void {
    this.router.navigate(['/dashboard']);
  }
}