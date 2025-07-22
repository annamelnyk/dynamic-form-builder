import { Routes } from '@angular/router'
import { BuildForm } from '@pages/build-form/build-form'
import { EditForm } from '@pages/edit-form/edit-form'
import { PreviewForm } from '@pages/preview-form/preview-form'

export const routes: Routes = [
  {
    path: '',
    title: 'Form Builder',
    component: BuildForm,
    children: [
      {
        path: 'edit',
        title: 'Edit Form',
        component: EditForm,
      },
      {
        path: 'preview',
        title: 'Preview Form',
        component: PreviewForm,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
]
