import { Component , ViewEncapsulation } from "@angular/core";

@Component({
  selector: "ap-tasks",
  templateUrl: "./tasks.component.html",
  styleUrls: [ "./tasks.component.scss" ],
})
export class TasksComponent {
  public readonly TASKS = [ "first", "second" ];

  public taskVariant: string = "";
}
