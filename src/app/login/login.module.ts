import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { MyTooltipModule } from "../my-tooltip/my-tooltip.module";
import { SharedModule } from "../shared/shared.module";

import { DialogSetPasswordComponent } from "./dialogs/set-password.component";
import { LoginComponent } from "./login.component";

@NgModule({
  declarations: [ LoginComponent, DialogSetPasswordComponent ],
  imports: [ CommonModule, SharedModule, MyTooltipModule ],
  exports: [ LoginComponent, DialogSetPasswordComponent ]
})
export class LoginModule {}
