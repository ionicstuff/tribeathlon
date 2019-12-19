import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DataResolverService } from './resolver/data-resolver.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'slider',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'home/:id',
    resolve: {
      special: DataResolverService
    },
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
  { path: 'addfriends', loadChildren: './addfriends/addfriends.module#AddfriendsPageModule' },
  { path: 'slider', loadChildren: './slider/slider.module#SliderPageModule' },
  { path: 'tribes', loadChildren: './tribes/tribes.module#TribesPageModule' },
  { path: 'notifications', loadChildren: './notifications/notifications.module#NotificationsPageModule' },
  { path: 'event-details/:id', loadChildren: './event-details/event-details.module#EventDetailsPageModule' },
  { path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule' },
  { path: 'addtribe', loadChildren: './addtribe/addtribe.module#AddtribePageModule' },
  { path: 'forgotpassword', loadChildren: './forgotpassword/forgotpassword.module#ForgotpasswordPageModule' },
  { path: 'landing', loadChildren: './landing/landing.module#LandingPageModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
  { path: 'support-page', loadChildren: './support-page/support-page.module#SupportPagePageModule' },
  { path: 'change-password', loadChildren: './change-password/change-password.module#ChangePasswordPageModule' },
  { path: 'edit-event/:id', loadChildren: './edit-event/edit-event.module#EditEventPageModule' },
  { path: 'search-page', loadChildren: './search-page/search-page.module#SearchPagePageModule' },
  { path: 'view-participant', loadChildren: './view-participant/view-participant.module#ViewParticipantPageModule' },
  { path: 'view-participants/:id', loadChildren: './view-participants/view-participants.module#ViewParticipantsPageModule' },
  { path: 'tribe-detail/:id', loadChildren: './tribe-detail/tribe-detail.module#TribeDetailPageModule' },
  { path: 'tribeinvite', loadChildren: './tribeinvite/tribeinvite.module#TribeinvitePageModule' },
  { path: 'commontribes', loadChildren: './commontribes/commontribes.module#CommontribesPageModule' },





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
