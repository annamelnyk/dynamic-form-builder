import { Routes } from '@angular/router';
import { BuildForm } from './pages/build-form/build-form';

export const routes: Routes = [
  {
    path: '',
    title: 'Form Builder',
    component: BuildForm,
  },
];
