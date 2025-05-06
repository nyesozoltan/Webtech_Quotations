import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Quote } from '../../_model/quote';
import { FormsModule } from '@angular/forms';

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

}
