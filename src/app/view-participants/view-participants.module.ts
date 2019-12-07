import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ViewParticipantsPage } from './view-participants.page';

const routes: Routes = [
  {
    path: '',
    component: ViewParticipantsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ViewParticipantsPage]
})
export class ViewParticipantsPageModule {}
