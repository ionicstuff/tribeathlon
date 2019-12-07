import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TribeinvitePage } from './tribeinvite.page';

const routes: Routes = [
  {
    path: '',
    component: TribeinvitePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TribeinvitePage]
})
export class TribeinvitePageModule {}
