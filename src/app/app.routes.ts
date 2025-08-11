import { inject } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivateChildFn,
  RedirectCommand,
  Router,
  RouterStateSnapshot,
  Routes,
} from '@angular/router'
import { BuildForm } from '@pages/build-form/build-form'
import { FormBuilderService } from '@services/form-builder/form-builder'

const previewGuard: CanActivateChildFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const router = inject(Router)
  const formBuilderService = inject(FormBuilderService)

  if (!formBuilderService.previewFormEnabled()) {
    const editFormPath = router.parseUrl('/edit')

    return new RedirectCommand(editFormPath, {
      skipLocationChange: true,
    })
  }

  return true
}

export const routes: Routes = [
  {
    path: '',
    title: 'Form Builder',
    component: BuildForm,
    children: [
      {
        path: 'edit',
        title: 'Edit Form',
        loadComponent: () => import('./pages/edit-form/edit-form').then(m => m.EditForm),
      },
      {
        path: 'preview',
        title: 'Preview Form',
        loadComponent: () => import('./pages/preview-form/preview-form').then(m => m.PreviewForm),
        canActivate: [previewGuard],
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
]
