import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { JoinedeventsPage } from './joinedevents.page';

const routes: Routes = [
  {
    path: '',
    component: JoinedeventsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [JoinedeventsPage]
})
export class JoinedeventsPageModule {}
