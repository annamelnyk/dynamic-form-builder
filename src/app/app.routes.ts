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
import { EditForm } from '@pages/edit-form/edit-form'
import { PreviewForm } from '@pages/preview-form/preview-form'
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
        component: EditForm,
      },
      {
        path: 'preview',
        title: 'Preview Form',
        component: PreviewForm,
        canActivate: [previewGuard],
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
]
