import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { RegistrationModule } from './registration/registration.module';
import { LoginModule } from './login/login.module';

import { ContactsComponent } from './contacts/contacts.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { AlphabetComponent } from './alphabet/alphabet.component';
import { LetterComponent } from './letter/letter.component';
import { LoginGuard } from './guards/login.guard';
import { LoggedInGuard } from './guards/loggedin.guard';
import { StudentGuard } from './guards/student.guard';
import { LetterModule } from './letter/letter.module';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contacts', component: ContactsComponent, canActivate: [LoginGuard] },
  {
    path: 'registration',
    component: RegistrationComponent,
    canActivate: [LoggedInGuard],
  },
  { path: 'login', component: LoginComponent, canActivate: [LoggedInGuard] },
  {
    path: 'alphabet',
    canActivate: [LoginGuard, StudentGuard],
    children: [
      { path: '', component: AlphabetComponent },
      { path: 'letter/:id', component: LetterComponent },
    ],
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  declarations: [
    HomeComponent,
    ContactsComponent,
    AlphabetComponent,
    PageNotFoundComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RegistrationModule,
    LoginModule,
    LetterModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
