import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { QuotationDetailsComponent } from './components/quotation-details/quotation-details.component';
import { QuotationFormComponent } from './components/quotation-form/quotation-form.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent,        
    },
    {
        path: 'dashboard',
        component: DashboardComponent,        
    },
    { 
        path: 'quote/:id',
        component: QuotationDetailsComponent
    },
    {
        path: 'add-quote',
        component: QuotationFormComponent
    },
    {
        path: 'edit-quote/:id',
        component: QuotationFormComponent
    },
    {
        path: '**',
        redirectTo: '',        
    },
];
