import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { QuoteService } from '../../_services/quote.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Quote } from '../../_model/quote';


@Component({
  selector: 'app-quote-form',
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './quotation-form.component.html',
  styleUrl: './quotation-form.component.css'
})
export class QuotationFormComponent {
  form!: FormGroup;
  isEdit = false;
  quoteId?: string;

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
      source: [''],
      categories: [''],
      mood: ['Tervezett', Validators.required],      
    });

    this.quoteId = this.route.snapshot.paramMap.get('id') || undefined;
    if (this.quoteId) {
      const quote = this.quoteService.getQuoteById(this.quoteId);
      if (quote) {
        this.isEdit = true;
        this.form.patchValue(quote);
      } else {
        alert('Az idézet nem található.');
        this.router.navigate(['dashboard']);
      }
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const formValue = this.form.value;

    if (this.isEdit && this.quoteId) {
      const updatedQuote: Quote = { id: this.quoteId, ...formValue };
      this.quoteService.updateQuote(updatedQuote);
    } else {
      const newQuote: Quote = { id: crypto.randomUUID(), ...formValue };
      this.quoteService.addQuote(newQuote);
    }

    this.router.navigate(['dashboard']);
  }
}


