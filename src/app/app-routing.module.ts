import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  { path: 'slider', loadChildren: './slider/slider.module#SliderPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'registration', loadChildren: './registration/registration.module#RegistrationPageModule' },
  { path: 'searchevent', loadChildren: './searchevent/searchevent.module#SearcheventPageModule' },
  { path: 'searchresult', loadChildren: './searchresult/searchresult.module#SearchresultPageModule' },
  { path: 'all-training', loadChildren: './all-training/all-training.module#AllTrainingPageModule' },
  { path: 'joinedevents', loadChildren: './joinedevents/joinedevents.module#JoinedeventsPageModule' },
  { path: 'myevents', loadChildren: './myevents/myevents.module#MyeventsPageModule' },
  { path: 'addevent', loadChildren: './addevent/addevent.module#AddeventPageModule' },
  { path: 'viewfriends', loadChildren: './viewfriends/viewfriends.module#ViewfriendsPageModule' },
  { path: 'addfriends', loadChildren: './addfriends/addfriends.module#AddfriendsPageModule' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
