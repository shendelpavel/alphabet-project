import { Injectable } from "@angular/core";

import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: "root" })
export class TooltipService {
  public isMouseover = new BehaviorSubject(false);
  public currentIsMouseover$ = this.isMouseover.asObservable();

  public setTooltipStatus(isMouseover: boolean): void {
    this.isMouseover.next(isMouseover);
  }
}
