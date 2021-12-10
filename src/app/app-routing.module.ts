import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ContactsComponent } from './contacts/contacts.component';
import { InfoComponent } from './info/info.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: InfoComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    InfoComponent,
    ContactsComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
