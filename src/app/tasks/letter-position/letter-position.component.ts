import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

import LettersData from "src/assets/letters-data.json";

import { Letter } from "../../services/shared/letter.model";

@Component({
  selector: "ap-task-letter-position",
  templateUrl: "./letter-position.component.html",
  styleUrls: [ "./letter-position.component.scss" ]
})
export class LetterPositionComponent {
  public alphabet: Letter[] = LettersData;

  constructor(private readonly dialog: MatDialog) {}
}
