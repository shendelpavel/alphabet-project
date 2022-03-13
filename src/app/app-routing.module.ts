import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { AlphabetComponent } from "./alphabet/alphabet.component";
import { AlphabetModule } from "./alphabet/alphabet.module";
import { ContactsComponent } from "./contacts/contacts.component";
import { HomeComponent } from "./home/home.component";
import { LetterComponent } from "./letter/letter.component";
import { LetterModule } from "./letter/letter.module";
import { LoggedInGuard } from "./guards/loggedin.guard";
import { LoginComponent } from "./login/login.component";
import { LoginGuard } from "./guards/login.guard";
import { LoginModule } from "./login/login.module";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { RegistrationComponent } from "./registration/registration.component";
import { RegistrationModule } from "./registration/registration.module";
import { RoleGuard } from "./guards/role.guard";
import { SharedModule } from "./shared/shared.module";
import { TasksComponent } from "./tasks/tasks.component";
import { UserRole } from "./services/shared/user-role";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "contacts", component: ContactsComponent, canActivate: [ LoginGuard ] },
  {
    path: "registration",
    component: RegistrationComponent,
    canActivate: [ LoggedInGuard ]
  },
  { path: "login", component: LoginComponent, canActivate: [ LoggedInGuard ] },
  {
    path: "alphabet",
    canActivate: [ LoginGuard, RoleGuard ],
    data: { role: UserRole.Student },
    children: [
      { path: "", component: AlphabetComponent },
      { path: "letter/:id", component: LetterComponent }
    ]
  },
  {
    path: "tasks",
    component: TasksComponent
    // canActivate: [LoggedInGuard, RoleGuard],
    // data: { role: UserRole.Student },
  },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  declarations: [ HomeComponent, ContactsComponent, PageNotFoundComponent ],
  imports: [
    CommonModule,
    SharedModule,
    RegistrationModule,
    LoginModule,
    LetterModule,
    AlphabetModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
