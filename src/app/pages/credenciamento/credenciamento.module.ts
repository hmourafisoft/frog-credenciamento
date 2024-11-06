import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CredenciamentoComponent } from './credenciamento.component';
import { ModalsModule, WidgetsModule } from '../../_metronic/partials';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [CredenciamentoComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule,
    RouterModule.forChild([
      {
        path: '',
        component: CredenciamentoComponent,
      },
    ]),
    WidgetsModule,
    ModalsModule,
  ],
})
export class CredenciamentoModule {}
